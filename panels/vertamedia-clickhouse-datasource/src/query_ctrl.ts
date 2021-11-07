///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {map} from 'lodash-es';
import {QueryCtrl} from 'grafana/app/plugins/sdk';
import SqlQuery from './sql_query';
import Scanner from './scanner';

import chInfo from './clickhouse-info.js';
import chMode from './mode-clickhouse.js';
import chSnippets from './snippets/clickhouse.js';

const defaultQuery = "SELECT $timeSeries as t, count() FROM $table WHERE $timeFilter GROUP BY t ORDER BY t";

class SqlQueryCtrl extends QueryCtrl {
    static templateUrl = 'partials/query.editor.html';

    queryModel: SqlQuery;
    databaseSegment: any;

    dateTimeType: any;
    dateColDataTypeSegment: any;
    dateTimeColDataTypeSegment: any;
    tableSegment: any;
    formats: any[];

    panel: any;
    datasource: any;
    target: any;
    resolutions: any;
    scanner: any;
    editMode: boolean;
    textareaHeight: any;
    dateTimeTypeOptions: any;

    completerCache: any[];

    tableLoading: boolean;
    datetimeLoading: boolean;
    dateLoading: boolean;

    showLastQuerySQL: boolean;
    showHelp: boolean;

    editorLoaded = false;

    /** @ngInject **/
    constructor($scope, $injector, templateSrv, private uiSegmentSrv) {
        super($scope, $injector);

        this.queryModel = new SqlQuery(this.target, templateSrv, this.panel.scopedVars);
        if (this.datasource.targetsRef) {
            this.datasource.targetsRef[this.target.refId] = this.target;
        }

        let defaultDatabaseSegment = {fake: true, value: '-- database --'};
        if (this.datasource.defaultDatabase.length > 0) {
            defaultDatabaseSegment = {fake: false, value: this.datasource.defaultDatabase};
        }
        this.databaseSegment = uiSegmentSrv.newSegment(
            this.target.database || defaultDatabaseSegment
        );

        this.tableSegment = uiSegmentSrv.newSegment(
            this.target.table || {fake: true, value: '-- table --'}
        );

        this.dateColDataTypeSegment = uiSegmentSrv.newSegment(
            this.target.dateColDataType || {fake: true, value: '-- date : col --'}
        );

        this.dateTimeColDataTypeSegment = uiSegmentSrv.newSegment(
            this.target.dateTimeColDataType || {fake: true, value: '-- dateTime : col --'}
        );

        this.resolutions = map([1, 2, 3, 4, 5, 10], function (f) {
            return {factor: f, label: '1/' + f};
        });

        this.completerCache = [];

        this.dateTimeTypeOptions = [
            {text: 'Column:DateTime', value: 'DATETIME'},
            {text: 'Column:DateTime64', value: 'DATETIME64'},
            {text: 'Column:TimeStamp', value: 'TIMESTAMP'},
        ];

        this.formats = [
            {text: 'Time series', value: 'time_series'},
            {text: 'Table', value: 'table'},
        ];

        this.target.format = this.target.format || 'time_series';
        if (typeof this.target.extrapolate === 'undefined') {
            this.target.extrapolate = true;
        }
        if (typeof this.target.skip_comments === 'undefined') {
            this.target.skip_comments = true;
        }
        this.target.dateTimeType = this.target.dateTimeType || this.dateTimeTypeOptions[0].value;
        this.target.round = this.target.round || "0s";
        this.target.intervalFactor = this.target.intervalFactor || 1;
        this.target.query = this.target.query || defaultQuery;
        this.target.formattedQuery = this.target.formattedQuery || this.target.query;
        this.scanner = new Scanner(this.target.query);
        if (this.target.query === defaultQuery) {
            this.target.query = this.format();
        }

        /* Update database if default database is used to prepopulate the field */
        if (this.target.database === undefined && !defaultDatabaseSegment.fake) {
            this.databaseChanged();
        }

        this.initEditor();
    }

    getCollapsedText() {
        return this.target.query;
    }

    fakeSegment(value) {
        return this.uiSegmentSrv.newSegment({fake: true, value: value});
    }

    getDateColDataTypeSegments() {
        let target = this.target;
        target.dateLoading = true;

        return this.querySegment('DATE').then(function (response) {
            target.dateLoading = false;
            return response;
        });
    }

    dateColDataTypeChanged() {
        let val = this.dateColDataTypeSegment.value;
        if (typeof val === 'string') {
            this.target.dateColDataType = val.trim();
        } else {
            this.target.dateColDataType = val;
        }
    }

    dateTimeTypeChanged() {
        let self = this;
        this.getDateTimeColDataTypeSegments().then(function (segments) {
            if (segments.length === 0) {
                return;
            }
            self.applySegment(self.dateTimeColDataTypeSegment, segments[0]);
            self.dateTimeColDataTypeChanged();
        });
    }

    getDateTimeColDataTypeSegments() {
        let target = this.target;
        target.datetimeLoading = true;
        return this.querySegment(target.dateTimeType).then(function (response) {
            target.datetimeLoading = false;
            return response;
        });
    }

    dateTimeColDataTypeChanged() {
        let val = this.dateTimeColDataTypeSegment.value;
        if (typeof val === 'string') {
            this.target.dateTimeColDataType = val.trim();
        } else {
            this.target.dateTimeColDataType = val;
        }
    }

    initEditor() {
        if (this.editorLoaded) {
            return;
        }

        if (chInfo()) {
            chMode();
            chSnippets();

            this.editorLoaded = true;
        } else {
            setTimeout(this.initEditor, 500);
        }
    }

    toggleEditorMode() {
        this.target.rawQuery = !this.target.rawQuery;

        this.initEditor();
    }

    toggleEdit(e: any, editMode: boolean) {
        if (editMode) {
            this.editMode = true;
            this.textareaHeight = "height: " + e.currentTarget.offsetHeight + "px;";
            return;
        }

        if (this.editMode === true) {
            this.editMode = false;
            this.refresh();
        }
    }

    getCompleter() {
        return this;
    }

    getCompletions(editor, session, pos, prefix, callback) {
        if (this.target.database === undefined || this.target.table === undefined) {
            callback(null, []);
            return;
        }

        let self = this;
        let key = self.target.database + '.' + self.target.table;
        if (self.completerCache[key]) {
            callback(null, self.completerCache[key]);
            return;
        }

        self.queryColumns().then(function (response) {
            self.completerCache[key] = response.map(function (item) {
                return {
                    caption: item.text,
                    value: item.text,
                    meta: key,
                    docHTML: SqlQueryCtrl._convertToHTML(item),
                };
            });
            callback(null, self.completerCache[key]);
        });
    }

    static _convertToHTML(item: any) {
        let desc = item.value,
            space_index = 0,
            start = 0,
            line = "",
            next_line_end = 60,
            lines = [];
        for (let i = 0; i < desc.length; i++) {
            if (desc[i] === ' ') {
                space_index = i;
            } else if (i >= next_line_end && space_index !== 0) {
                line = desc.slice(start, space_index);
                lines.push(line);
                start = space_index + 1;
                next_line_end = i + 60;
                space_index = 0;
            }
        }
        line = desc.slice(start);
        lines.push(line);
        return ["<b>", item.text, "</b>", "<hr/>", lines.join("&nbsp<br>")].join("");
    }

    getDatabaseSegments() {
        return this.querySegment('DATABASES');
    }

    databaseChanged() {
        this.target.database = this.databaseSegment.value;
        this.applySegment(this.tableSegment, this.fakeSegment('-- table : col --'));
        this.applySegment(this.dateColDataTypeSegment, this.fakeSegment('-- date : col --'));
        this.applySegment(this.dateTimeColDataTypeSegment, this.fakeSegment('-- dateTime : col --'));
    }

    getTableSegments() {
        let target = this.target;
        target.tableLoading = true;
        return this.querySegment('TABLES').then(function (response) {
            target.tableLoading = false;
            return response;
        });
    }

    tableChanged() {
        this.target.table = this.tableSegment.value;
        this.applySegment(this.dateColDataTypeSegment, this.fakeSegment('-- date : col --'));
        this.applySegment(this.dateTimeColDataTypeSegment, this.fakeSegment('-- dateTime : col --'));

        let self = this;
        this.getDateColDataTypeSegments().then(function (segments) {
            if (segments.length === 0) {
                return;
            }
            self.applySegment(self.dateColDataTypeSegment, segments[0]);
            self.dateColDataTypeChanged();
        });
        this.getDateTimeColDataTypeSegments().then(function (segments) {
            if (segments.length === 0) {
                return;
            }
            self.applySegment(self.dateTimeColDataTypeSegment, segments[0]);
            self.dateTimeColDataTypeChanged();
        });
    }

    formatQuery() {
        this.target.query = this.format();
        this.toggleEdit({}, false);
    }

    toQueryMode() {
        this.toggleEditorMode();
        this.refresh();
    }

    format() {
        try {
            return this.getScanner().Format();
        } catch (err) {
            console.log("Parse error: ", err);
            return this.getScanner().raw();
        }
    }

    getScanner() {
        if (this.scanner.raw() !== this.target.query) {
            this.scanner = new Scanner(this.target.query);
        }
        return this.scanner;
    }

    handleQueryError(err) {
        this.error = err.message || 'Failed to issue metric query';
        return [];
    }

    queryColumns() {
        let query = this.buildExploreQuery('COLUMNS');
        return this.datasource.metricFindQuery(query);
    }

    querySegment(type: string) {
        let query = this.buildExploreQuery(type);
        return this.datasource.metricFindQuery(query)
            .then(this.uiSegmentSrv.transformToSegments(false))
            .catch(this.handleQueryError.bind(this));
    }

    applySegment(dst, src) {
        dst.value = src.value;
        dst.html = src.html || src.value;
        dst.fake = src.fake === undefined ? false : src.fake;
    }

    buildExploreQuery(type) {
        let query;
        switch (type) {
            case 'TABLES':
                query = 'SELECT name ' +
                    'FROM system.tables ' +
                    'WHERE database = \'' + this.target.database + '\' ' +
                    'ORDER BY name';
                break;
            case 'DATE':
                query = 'SELECT name ' +
                    'FROM system.columns ' +
                    'WHERE database = \'' + this.target.database + '\' AND ' +
                    'table = \'' + this.target.table + '\' AND ' +
                    'match(type,\'^Date$|^Date\\([^)]+\\)$\') ' +
                    'ORDER BY name ' +
                    'UNION ALL SELECT \' \' AS name';
                break;
            case 'DATETIME':
                query = 'SELECT name ' +
                    'FROM system.columns ' +
                    'WHERE database = \'' + this.target.database + '\' AND ' +
                    'table = \'' + this.target.table + '\' AND ' +
                    'match(type,\'^DateTime$|^DateTime\\([^)]+\\)$\') ' +
                    'ORDER BY name';
                break;
            case 'DATETIME64':
                query = 'SELECT name ' +
                    'FROM system.columns ' +
                    'WHERE database = \'' + this.target.database + '\' AND ' +
                    'table = \'' + this.target.table + '\' AND ' +
                    'type LIKE \'DateTime64%\' ' +
                    'ORDER BY name';
                break;
            case 'TIMESTAMP':
                query = 'SELECT name ' +
                    'FROM system.columns ' +
                    'WHERE database = \'' + this.target.database + '\' AND ' +
                    'table = \'' + this.target.table + '\' AND ' +
                    'type = \'UInt32\' ' +
                    'ORDER BY name';
                break;
            case 'DATABASES':
                query = 'SELECT name ' +
                    'FROM system.databases ' +
                    'ORDER BY name';
                break;
            case 'COLUMNS':
                query = 'SELECT name text, type value ' +
                    'FROM system.columns ' +
                    'WHERE database = \'' + this.target.database + '\' AND ' +
                    'table = \'' + this.target.table + '\'';
                break;
        }
        return query;
    }
}

export {SqlQueryCtrl};
