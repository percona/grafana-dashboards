///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { isObject } from 'lodash-es';
var ResponseParser = /** @class */ (function () {
    function ResponseParser($q) {
        this.$q = $q;
    }
    ResponseParser.prototype.parse = function (query, results) {
        if (!results || results.data.length === 0) {
            return [];
        }
        var sqlResults = results.data;
        var res = [];
        var keys = Object.keys(sqlResults[0]);
        var textColIndex = ResponseParser.findColIndex(keys, '__text');
        var valueColIndex = ResponseParser.findColIndex(keys, '__value');
        var keyValuePairs = keys.length === 2 && textColIndex !== -1 && valueColIndex !== -1;
        sqlResults.forEach(function (result) {
            if (!isObject(result)) {
                res.push({ text: result });
                return;
            }
            var keys = Object.keys(result);
            if (keys.length > 1) {
                if (keyValuePairs) {
                    res.push({ text: result[keys[textColIndex]], value: result[keys[valueColIndex]] });
                }
                else {
                    res.push(result);
                }
            }
            else {
                res.push({ text: result[keys[0]] });
            }
        });
        return res;
    };
    ResponseParser.findColIndex = function (columns, colName) {
        for (var i = 0; i < columns.length; i++) {
            if (columns[i] === colName) {
                return i;
            }
        }
        return -1;
    };
    ResponseParser.prototype.transformAnnotationResponse = function (options, data) {
        var rows = data.data;
        var columns = data.meta;
        var result = [];
        var hasTime = false;
        for (var i = 0, len = columns.length; i < len; i++) {
            var column = columns[i];
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
        for (var i = 0, len = rows.length; i < len; i++) {
            var row = rows[i];
            result.push({
                annotation: options.annotation,
                time: Math.floor(row.time),
                title: row.title,
                text: row.text,
                tags: row.tags ? row.tags.trim().split(/\s*,\s*/) : []
            });
        }
        return result;
    };
    return ResponseParser;
}());
export default ResponseParser;
//# sourceMappingURL=response_parser.js.map