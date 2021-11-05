///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import {isObject} from 'lodash-es';

export default class ResponseParser {
    constructor(private $q) {
    }

    parse(query: string, results: any): any[] {
        if (!results || results.data.length === 0) {
            return [];
        }

        const sqlResults = results.data;
        const res = [];

        const keys = Object.keys(sqlResults[0]);
        const textColIndex = ResponseParser.findColIndex(keys, '__text');
        const valueColIndex = ResponseParser.findColIndex(keys, '__value');
        const keyValuePairs = keys.length === 2 && textColIndex !== -1 && valueColIndex !== -1;

        sqlResults.forEach(result => {
            if (!isObject(result)) {
                res.push({text: result});
                return;
            }

            let keys = Object.keys(result);
            if (keys.length > 1) {
                if (keyValuePairs) {
                    res.push({text: result[keys[textColIndex]], value: result[keys[valueColIndex]]});
                } else {
                    res.push(result);
                }
            } else {
                res.push({text: result[keys[0]]});
            }
        });

        return res;
    }

    static findColIndex(columns: string[], colName: string): number {
        for (let i = 0; i < columns.length; i++) {
            if (columns[i] === colName) {
                return i;
            }
        }

        return -1;
    }

    transformAnnotationResponse(options, data) {
        const rows = data.data;
        const columns = data.meta;
        const result = [];
        let hasTime = false;

        for (let i = 0, len = columns.length; i < len; i++) {
            const column = columns[i];

            if (column.name === 'time') {
                hasTime = true;
                break;
            }
        }

        if (!hasTime) {
            return this.$q.reject({
                message: 'Missing mandatory time column in annotation query.',
            });
        }

        for (let i = 0, len = rows.length; i < len; i++) {
            const row = rows[i];

            result.push({
                annotation: options.annotation,
                time: Math.floor(row.time),
                title: row.title,
                text: row.text,
                tags: row.tags ? row.tags.trim().split(/\s*,\s*/) : []
            });
        }

        return result;
    }
}
