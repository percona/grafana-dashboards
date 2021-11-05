///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {curry, each, filter, isEmpty, map} from 'lodash-es';

import SqlSeries from './sql_series';
import SqlQuery from './sql_query';
import ResponseParser from './response_parser';
import AdhocCtrl from './adhoc';
import Scanner from './scanner';

const adhocFilterVariable = 'adhoc_query_filter';

export class ClickHouseDatasource {
    type: string;
    name: string;
    supportMetrics: boolean;
    url: string;
    directUrl: string;
    basicAuth: any;
    withCredentials: any;
    usePOST: boolean;
    defaultDatabase: string;
    addCorsHeader: boolean;
    responseParser: any;
    adhocCtrl: AdhocCtrl;
    xHeaderUser: string;
    xHeaderKey: string;
    useYandexCloudAuthorization: boolean;
    targetsRef: any;

    /** @ngInject */
    constructor(instanceSettings,
                private $q,
                private backendSrv,
                private templateSrv) {
        this.type = 'clickhouse';
        this.name = instanceSettings.name;
        this.supportMetrics = true;
        this.responseParser = new ResponseParser(this.$q);
        this.url = instanceSettings.url;
        this.directUrl = instanceSettings.directUrl;
        this.basicAuth = instanceSettings.basicAuth;
        this.withCredentials = instanceSettings.withCredentials;
        this.addCorsHeader = instanceSettings.jsonData.addCorsHeader;
        this.usePOST = instanceSettings.jsonData.usePOST;
        this.defaultDatabase = instanceSettings.jsonData.defaultDatabase || '';
        this.adhocCtrl = new AdhocCtrl(this);
        this.xHeaderUser = instanceSettings.jsonData.xHeaderUser;
        this.xHeaderKey = instanceSettings.jsonData.xHeaderKey;
        this.useYandexCloudAuthorization = instanceSettings.jsonData.useYandexCloudAuthorization;
        this.targetsRef = {};
    }

    _getRequestOptions(query: string, usePOST?: boolean, requestId?: string) {
        let options: any = {
            url: this.url,
            requestId: requestId,
        };
        let params: Array<String> = [];

        if (usePOST) {
            options.method = 'POST';
            options.data = query;
        } else {
            options.method = 'GET';
            params.push('query=' + encodeURIComponent(query));
        }

        if (this.defaultDatabase) {
            params.push('database=' + this.defaultDatabase);
        }

        if (this.basicAuth || this.withCredentials) {
            options.withCredentials = true;
        }

        options.headers = options.headers || {};
        if (this.basicAuth) {
            options.headers.Authorization = this.basicAuth;
        }

        if (this.useYandexCloudAuthorization) {
            options.headers['X-ClickHouse-User'] = this.xHeaderUser;
            options.headers['X-ClickHouse-Key'] = this.xHeaderKey;
        }

        if (this.addCorsHeader) {
            params.push('add_http_cors_header=1');
        }

        if (params.length) {
            options.url += (options.url.indexOf('?') !== -1 ? '&' : '/?') + params.join('&');
        }

        return options;
    }

    _request(query: string, requestId?: string) {
        const queryParams = this._getRequestOptions(query, this.usePOST, requestId);

        return this.backendSrv.datasourceRequest(queryParams).then(result => {
            return result.data;
        });
    }

    query(options) {
        const queries = map(
            filter(options.targets, target => !target.hide && target.query),
            target => this.createQuery(options, target)
        );
        // No valid targets, return the empty result to save a round trip.
        if (isEmpty(queries)) {
            let d = this.$q.defer();
            d.resolve({data: []});
            return d.promise;
        }

        const allQueryPromise = map(queries, query => {
            return this._seriesQuery(query.stmt, query.requestId);
        });

        return this.$q.all(allQueryPromise).then((responses): any => {
            let result = [], i = 0;
            each(responses, (response) => {
                const target = options.targets[i];
                const keys = queries[i].keys;

                i++;
                if (!response || !response.rows) {
                    return;
                }

                let sqlSeries = new SqlSeries({
                    series: response.data,
                    meta: response.meta,
                    keys: keys,
                    tillNow: options.rangeRaw.to === 'now',
                    from: SqlQuery.convertTimestamp(options.range.from),
                    to: SqlQuery.convertTimestamp(options.range.to)
                });
                if (target.format === 'table') {
                    each(sqlSeries.toTable(), (data) => {
                        result.push(data);
                    });
                } else {
                    each(sqlSeries.toTimeSeries(target.extrapolate), (data) => {
                        result.push(data);
                    });
                }
            });
            return {data: result};
        });
    }

    createQuery(options, target) {
        const queryModel = new SqlQuery(target, this.templateSrv, options);
        const adhocFilters = this.templateSrv.getAdhocFilters(this.name);
        const stmt = queryModel.replace(options, adhocFilters);

        let keys = [];

        try {
            let queryAST = new Scanner(stmt).toAST();
            keys = queryAST['group by'] || [];
        } catch (err) {
            console.log('AST parser error: ', err);
        }

        if (this.targetsRef && this.targetsRef[target.refId]) {
            this.targetsRef[target.refId].rawQuery = stmt;
        }

        return {
            keys: keys,
            requestId: options.panelId + target.refId,
            stmt: stmt,
        };
    }

    annotationQuery(options) {
        if (!options.annotation.query) {
            return this.$q.reject({
                message: 'Query missing in annotation definition',
            });
        }

        const params = Object.assign({
            annotation: {
                dateTimeColDataType: 'time'
            },
            interval: '30s'
        }, options);
        let queryModel;
        let query;

        queryModel = new SqlQuery(params.annotation, this.templateSrv, params);
        queryModel = queryModel.replace(params, []);
        query = queryModel.replace(/(?:\r\n|\r|\n)/g, ' ');
        query += ' FORMAT JSON';

        const queryParams = this._getRequestOptions(query, true);

        return this.backendSrv
            .datasourceRequest(queryParams)
            .then(result => this.responseParser.transformAnnotationResponse(params, result.data));
    }

    metricFindQuery(query: string, options?: any) {
        let interpolatedQuery;

        try {
            interpolatedQuery = this.templateSrv.replace(SqlQuery.conditionalTest(
                query, this.templateSrv
            ), {}, SqlQuery.interpolateQueryExpr);
        } catch (err) {
            return this.$q.reject(err);
        }

        if (options && options.range) {
            let from = SqlQuery.convertTimestamp(options.range.from);
            let to = SqlQuery.convertTimestamp(options.range.to);
            interpolatedQuery = interpolatedQuery.replace(/\$to/g, to).replace(/\$from/g, from);
            interpolatedQuery = SqlQuery.replaceTimeFilters( interpolatedQuery, options.range);
            interpolatedQuery = interpolatedQuery.replace(/(?:\r\n|\r|\n)/g, ' ');
        }

        // todo(nv): fix request id
        return this._seriesQuery(interpolatedQuery)
            .then(curry(this.responseParser.parse)(query));
    }

    testDatasource() {
        return this.metricFindQuery('SELECT 1').then(
            () => {
                return {status: "success", message: "Data source is working", title: "Success"};
            });
    }

    _seriesQuery(query: string, requestId?: string) {
        query += ' FORMAT JSON';
        return this._request(query, requestId);
    }

    targetContainsTemplate(target) {
        return this.templateSrv.variableExists(target.expr);
    }

    getTagKeys() {
        // check whether variable `adhoc_query_filter` exists to apply additional filtering
        // @see https://github.com/Vertamedia/clickhouse-grafana/issues/75
        // @see https://github.com/grafana/grafana/issues/13109
        let queryFilter = '';
        each(this.templateSrv.variables, (v) => {
            if (v.name === adhocFilterVariable) {
                queryFilter = v.query;
            }
        });
        return this.adhocCtrl.GetTagKeys(queryFilter);
    }

    getTagValues(options) {
        return this.adhocCtrl.GetTagValues(options);
    }
}
