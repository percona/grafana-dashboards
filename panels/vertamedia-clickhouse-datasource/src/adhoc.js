var queryFilter = "database != 'system'";
var columnsQuery = "SELECT database, table, name, type FROM system.columns WHERE {filter} ORDER BY database, table";
var valuesQuery = "SELECT DISTINCT {field} AS value FROM {database}.{table} LIMIT 300";
var regexEnum = /'(?:[^']+|'')+'/gmi;
var AdhocCtrl = /** @class */ (function () {
    /** @ngInject */
    function AdhocCtrl(datasource) {
        this.tagKeys = [];
        this.tagValues = [];
        this.datasource = datasource;
        var filter = queryFilter;
        if (datasource.defaultDatabase.length > 0) {
            filter = "database = '" + datasource.defaultDatabase + "' AND " + queryFilter;
        }
        this.query = columnsQuery.replace('{filter}', filter);
    }
    // GetTagKeys fetches columns from CH tables according to provided filters
    // if no filters applied all tables from all databases will be fetched
    // if datasource setting `defaultDatabase` is set only tables from that database will be fetched
    // if query param passed it will be performed instead of default
    AdhocCtrl.prototype.GetTagKeys = function (query) {
        var self = this;
        if (this.tagKeys.length > 0) {
            return Promise.resolve(this.tagKeys);
        }
        var q = this.query;
        if (query.length > 0) {
            q = query;
        }
        return this.datasource.metricFindQuery(q)
            .then(function (response) {
            return self.processTagKeysResponse(response);
        });
    };
    AdhocCtrl.prototype.processTagKeysResponse = function (response) {
        var self = this;
        var columnNames = {};
        response.forEach(function (item) {
            var text = item.table + '.' + item.name;
            if (self.datasource.defaultDatabase.length === 0) {
                text = item.database + '.' + text;
            }
            var value = item.name;
            self.tagKeys.push({ text: text, value: value });
            if (item.type.slice(0, 4) === 'Enum') {
                var options = item.type.match(regexEnum);
                if (options.length > 0) {
                    self.tagValues[text] = [];
                    options.forEach(function (o) {
                        self.tagValues[text].push({ text: o, value: o });
                    });
                    self.tagValues[item.name] = self.tagValues[text];
                }
            }
            columnNames[item.name] = true;
        });
        /* Store unique column names with wildcard table */
        Object.keys(columnNames).forEach(function (columnName) {
            self.tagKeys.push({ text: columnName, value: columnName });
        });
        return Promise.resolve(self.tagKeys);
    };
    // GetTagValues returns column values according to passed options
    // Values for fields with Enum type were already fetched in GetTagKeys func and stored in `tagValues`
    // Values for fields which not represented on `tagValues` get from ClickHouse and cached on `tagValues`
    AdhocCtrl.prototype.GetTagValues = function (options) {
        var self = this;
        if (this.tagValues.hasOwnProperty(options.key)) {
            return Promise.resolve(this.tagValues[options.key]);
        }
        var key_items = options.key.split('.');
        if (key_items.length < 2 || (key_items.length === 2 && this.datasource.defaultDatabase.length === 0) || key_items.length > 3) {
            return Promise.resolve([]);
        }
        var field, database, table;
        if (key_items.length === 3) {
            database = key_items[0], table = key_items[1], field = key_items[2];
        }
        if (key_items.length === 2) {
            database = self.datasource.defaultDatabase;
            table = key_items[0], field = key_items[1];
        }
        var q = valuesQuery
            .replace('{field}', field)
            .replace('{database}', database)
            .replace('{table}', table);
        return this.datasource.metricFindQuery(q)
            .then(function (response) {
            self.tagValues[options.key] = self.processTagValuesResponse(response);
            return self.tagValues[options.key];
        });
    };
    AdhocCtrl.prototype.processTagValuesResponse = function (response) {
        var tagValues = [];
        response.forEach(function (item) {
            tagValues.push({ text: item.text, value: item.text });
        });
        return Promise.resolve(tagValues);
    };
    return AdhocCtrl;
}());
export default AdhocCtrl;
//# sourceMappingURL=adhoc.js.map