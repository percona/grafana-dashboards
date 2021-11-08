System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, normalizeColor, parseMath, parseMathExpression, getColor, replaceTokens, getActualNameWithoutTokens, getItemBasedOnThreshold, getMetricNameFromTaggedAlias, getLablesFromTaggedAlias, replace_tags_from_field, getSeriesValue, getCurrentTimeStamp, replaceDelimitedColumns, getRowName, getColName, getDisplayValueTemplate, doesValueNeedsToHide;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            exports_1("normalizeColor", normalizeColor = function (color) {
                if (color.toLowerCase() === 'green') {
                    return 'rgba(50, 172, 45, 0.97)';
                }
                else if (color.toLowerCase() === 'orange') {
                    return 'rgba(237, 129, 40, 0.89)';
                }
                else if (color.toLowerCase() === 'red') {
                    return 'rgba(245, 54, 54, 0.9)';
                }
                else {
                    return color.trim();
                }
            });
            exports_1("parseMath", parseMath = function (valuestring) {
                var returnvalue = 0;
                if (valuestring.indexOf('+') > -1) {
                    returnvalue = +valuestring.split('+')[0] + +valuestring.split('+')[1];
                }
                else if (valuestring.indexOf('-') > -1) {
                    returnvalue = +valuestring.split('-')[0] - +valuestring.split('-')[1];
                }
                else if (valuestring.indexOf('*') > -1) {
                    returnvalue = +valuestring.split('*')[0] * +valuestring.split('*')[1];
                }
                else if (valuestring.indexOf('/') > -1) {
                    returnvalue = +valuestring.split('/')[0] / +valuestring.split('/')[1];
                }
                else if (valuestring.indexOf('min') > -1) {
                    returnvalue = lodash_1.default.min([+valuestring.split('min')[0], +valuestring.split('min')[1]]) || 0;
                }
                else if (valuestring.indexOf('max') > -1) {
                    returnvalue = lodash_1.default.max([+valuestring.split('max')[0], +valuestring.split('max')[1]]) || 0;
                }
                else if (valuestring.indexOf('mean') > -1) {
                    returnvalue = lodash_1.default.mean([+valuestring.split('avg')[0], +valuestring.split('avg')[1]]) || 0;
                }
                else {
                    returnvalue = +valuestring;
                }
                return Math.round(+returnvalue);
            });
            exports_1("parseMathExpression", parseMathExpression = function (expression, index) {
                var valuestring = expression.replace(/\_/g, '').split(',')[index];
                return +parseMath(valuestring);
            });
            exports_1("getColor", getColor = function (expression, index) {
                var returnValue = (expression || '').split(',').length > index ? " style=\"color:" + normalizeColor(expression.replace(/\_/g, '').split(',')[index]) + "\" " : '';
                return returnValue;
            });
            exports_1("replaceTokens", replaceTokens = function (value) {
                if (!value) {
                    return value;
                }
                value = value + '';
                value = value
                    .split(' ')
                    .map(function (a) {
                    if (a.startsWith('_fa-') && a.endsWith('_')) {
                        var returnvalue = '';
                        var icon = a.replace(/\_/g, '').split(',')[0];
                        var color = getColor(a, 1);
                        var repeatCount = a.split(',').length >= 3 ? parseMathExpression(a, 2) : 1;
                        returnvalue = ("<i class=\"fa " + icon + "\" " + color + "></i> ").repeat(repeatCount);
                        if (a.split(',').length >= 4) {
                            var maxColor = getColor(a, 3);
                            var maxLength = a.split(',').length >= 5 ? parseMathExpression(a, 4) : 0;
                            returnvalue += ("<i class=\"fa " + icon + "\" " + maxColor + "></i> ").repeat(lodash_1.default.max([maxLength - repeatCount, 0]) || 0);
                        }
                        return returnvalue;
                    }
                    else if (a.startsWith('_img-') && a.endsWith('_')) {
                        a = a.slice(0, -1);
                        var imgUrl = a.replace('_img-', '').split(',')[0];
                        var imgWidth = a.split(',').length > 1 ? a.replace('_img-', '').split(',')[1] : '20px';
                        var imgHeight = a.split(',').length > 2 ? a.replace('_img-', '').split(',')[2] : '20px';
                        var repeatCount = a.split(',').length > 3 ? +a.replace('_img-', '').split(',')[3] : 1;
                        a = ("<img width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" src=\"" + imgUrl + "\"/>").repeat(repeatCount);
                    }
                    return a;
                })
                    .join(' ');
                return value;
            });
            exports_1("getActualNameWithoutTokens", getActualNameWithoutTokens = function (value) {
                if (!value) {
                    return value + '';
                }
                value = value + '';
                return value
                    .split(' ')
                    .map(function (a) {
                    if (a.startsWith('_fa-') && a.endsWith('_')) {
                        a = "";
                    }
                    else if (a.startsWith('_img-') && a.endsWith('_')) {
                        a = "";
                    }
                    return a;
                })
                    .join(' ');
            });
            exports_1("getItemBasedOnThreshold", getItemBasedOnThreshold = function (thresholds, ranges, value, defaultValue) {
                var c = defaultValue;
                if (thresholds && ranges && typeof value === 'number' && thresholds.length + 1 <= ranges.length) {
                    ranges = lodash_1.default.dropRight(ranges, ranges.length - thresholds.length - 1);
                    if (ranges[ranges.length - 1] === '') {
                        ranges[ranges.length - 1] = defaultValue;
                    }
                    for (var i = thresholds.length; i > 0; i--) {
                        if (value >= thresholds[i - 1]) {
                            return ranges[i];
                        }
                    }
                    return lodash_1.default.first(ranges) || '';
                }
                return c;
            });
            exports_1("getMetricNameFromTaggedAlias", getMetricNameFromTaggedAlias = function (target) {
                target = target.trim();
                var _metricname = target;
                if (target.indexOf('{') > -1 && target.indexOf('}') > -1 && target[target.length - 1] === '}') {
                    _metricname = target.split('{')[0].trim();
                }
                else {
                    _metricname = target;
                }
                return _metricname;
            });
            exports_1("getLablesFromTaggedAlias", getLablesFromTaggedAlias = function (target, label) {
                var _tags = [];
                target = target.trim();
                var tagsstring = target.replace(label, '').trim();
                if (tagsstring.startsWith('{') && tagsstring.endsWith('}')) {
                    var parsePrometheusLabels = function (labels) {
                        var labelsByKey = {};
                        labels.replace(/\b(\w+)(!?=~?)"([^"\n]*?)"/g, function (__, key, operator, value) {
                            if (!operator) {
                                console.log(operator);
                            }
                            labelsByKey[key] = value;
                            return '';
                        });
                        return labelsByKey;
                    };
                    lodash_1.default.each(parsePrometheusLabels(tagsstring), function (k, v) {
                        _tags.push({ tag: v, value: k });
                    });
                    if (tagsstring.indexOf(':') > -1 && _tags.length === 0) {
                        var label_values = tagsstring
                            .slice(1)
                            .trim()
                            .slice(0, -1)
                            .trim() || '';
                        _tags = label_values
                            .split(',')
                            .map(function (item) { return (item || '').trim(); })
                            .filter(function (item) { return item && item.indexOf(':') > -1; })
                            .map(function (item) {
                            if (item.split(':').length === 2) {
                                var ret = {};
                                ret.tag = item.split(':')[0].trim();
                                ret.value = item.split(':')[1].trim();
                                return ret;
                            }
                            else {
                                return null;
                            }
                        })
                            .filter(function (item) { return item; });
                    }
                }
                return _tags;
            });
            exports_1("replace_tags_from_field", replace_tags_from_field = function (field, tags) {
                if (tags && tags.length > 0) {
                    field = tags.reduce(function (r, it) {
                        return r.replace(new RegExp('{{' + it.tag.trim() + '}}', 'g'), it.value).replace(/\"/g, '');
                    }, field);
                }
                return field;
            });
            exports_1("getSeriesValue", getSeriesValue = function (series, statType) {
                var value = NaN;
                statType = (statType || '').toLowerCase();
                if (series) {
                    if (statType === 'last_time' && series.datapoints && series.datapoints.length > 0) {
                        if (lodash_1.default.last(series.datapoints)) {
                            value = lodash_1.default.last(series.datapoints)[1];
                        }
                    }
                    else if (statType === 'last_time_nonnull') {
                        var non_null_data = series.datapoints.filter(function (s) { return s[0]; });
                        if (lodash_1.default.last(non_null_data) && lodash_1.default.last(non_null_data)[1]) {
                            value = lodash_1.default.last(non_null_data)[1];
                        }
                    }
                    else if (series.stats) {
                        value = series.stats[statType] || null;
                    }
                }
                return value;
            });
            exports_1("getCurrentTimeStamp", getCurrentTimeStamp = function (dataPoints) {
                var currentTimeStamp = new Date();
                if (dataPoints && dataPoints.length > 0 && lodash_1.default.last(dataPoints).length === 2) {
                    currentTimeStamp = new Date(lodash_1.default.last(dataPoints)[1]);
                }
                return currentTimeStamp;
            });
            exports_1("replaceDelimitedColumns", replaceDelimitedColumns = function (inputstring, seriesName, delimiter, row_col_wrapper) {
                var outputString = seriesName.split(delimiter || '.').reduce(function (r, it, i) {
                    return r.replace(new RegExp(row_col_wrapper + i + row_col_wrapper, 'g'), it);
                }, inputstring);
                return outputString;
            });
            exports_1("getRowName", getRowName = function (row_name, delimiter, row_col_wrapper, seriesName, _metricname, _tags) {
                if (delimiter.toLowerCase() === 'tag') {
                    row_name = row_name.replace(new RegExp('{{metric_name}}', 'g'), _metricname);
                    row_name = replace_tags_from_field(row_name, _tags);
                }
                else {
                    row_name = replaceDelimitedColumns(row_name, seriesName, delimiter, row_col_wrapper);
                    if (seriesName.split(delimiter || '.').length === 1) {
                        row_name = seriesName;
                    }
                }
                return row_name.replace(new RegExp('_series_', 'g'), seriesName.toString());
            });
            exports_1("getColName", getColName = function (col_name, delimiter, row_col_wrapper, seriesName, row_name, _metricname, _tags) {
                if (delimiter.toLowerCase() === 'tag') {
                    col_name = col_name.replace(new RegExp('{{metric_name}}', 'g'), _metricname);
                    row_name = replace_tags_from_field(col_name, _tags);
                }
                else {
                    col_name = replaceDelimitedColumns(col_name, seriesName, delimiter, row_col_wrapper);
                    if (seriesName.split(delimiter || '.').length === 1 || row_name === seriesName) {
                        col_name = col_name || 'Value';
                    }
                }
                return col_name.replace(new RegExp('_series_', 'g'), seriesName.toString());
            });
            exports_1("getDisplayValueTemplate", getDisplayValueTemplate = function (value, pattern, seriesName, row_col_wrapper, thresholds) {
                var template = '_value_';
                if (lodash_1.default.isNaN(value) || value === null) {
                    template = pattern.null_value || 'No data';
                    if (pattern.null_value === '') {
                        template = '';
                    }
                }
                else {
                    template = pattern.displayTemplate || template;
                    if (pattern.enable_transform) {
                        var transform_values = pattern.transform_values.split('|');
                        template = getItemBasedOnThreshold(thresholds, transform_values, value, template);
                    }
                    if (pattern.enable_transform_overrides && pattern.transform_values_overrides !== '') {
                        var _transform_values_overrides = pattern.transform_values_overrides
                            .split('|')
                            .filter(function (con) { return con.indexOf('->'); })
                            .map(function (con) { return con.split('->'); })
                            .filter(function (con) { return +con[0] === value; })
                            .map(function (con) { return con[1]; });
                        if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== '') {
                            template = ('' + _transform_values_overrides[0]).trim();
                        }
                    }
                    if (pattern.enable_transform || pattern.enable_transform_overrides) {
                        template = replaceDelimitedColumns(template, seriesName, pattern.delimiter, row_col_wrapper);
                    }
                }
                return template;
            });
            exports_1("doesValueNeedsToHide", doesValueNeedsToHide = function (value, filter) {
                var hidden = false;
                if ((value || value === 0) && filter && (filter.value_below !== '' || filter.value_above !== '')) {
                    if (filter.value_below !== '' && value < +filter.value_below) {
                        hidden = true;
                    }
                    if (filter.value_above !== '' && value > +filter.value_above) {
                        hidden = true;
                    }
                }
                return hidden;
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ib29tL0Jvb21VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztZQUdBLDRCQUFhLGNBQWMsR0FBRyxVQUFVLEtBQWE7Z0JBQ25ELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtvQkFDbkMsT0FBTyx5QkFBeUIsQ0FBQztpQkFDbEM7cUJBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO29CQUMzQyxPQUFPLDBCQUEwQixDQUFDO2lCQUNuQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7b0JBQ3hDLE9BQU8sd0JBQXdCLENBQUM7aUJBQ2pDO3FCQUFNO29CQUNMLE9BQU8sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNyQjtZQUNILENBQUMsRUFBQztZQUNGLHVCQUFhLFNBQVMsR0FBRyxVQUFVLFdBQW1CO2dCQUNwRCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDakMsV0FBVyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZFO3FCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDeEMsV0FBVyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxD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LEtBQUssRUFBRSxFQUFFOzRCQUNuRixRQUFRLEdBQUcsQ0FBQyxFQUFFLEdBQUcsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt5QkFDekQ7cUJBQ0Y7b0JBQ0QsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLDBCQUEwQixFQUFFO3dCQUNsRSxRQUFRLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO3FCQUM5RjtpQkFDRjtnQkFDRCxPQUFPLFFBQVEsQ0FBQztZQUNsQixDQUFDLEVBQUM7WUFDRixrQ0FBYSxvQkFBb0IsR0FBRyxVQUFVLEtBQWEsRUFBRSxNQUFXO2dCQUN0RSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLEVBQUU7b0JBQ2hHLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTt3QkFDNUQsTUFBTSxHQUFHLElBQUksQ0FBQztxQkFDZjtvQkFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLEtBQUssRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7d0JBQzVELE1BQU0sR0FBRyxJQUFJLENBQUM7cUJBQ2Y7aUJBQ0Y7Z0JBQ0QsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgSUJvb21QYXR0ZXJuIH0gZnJvbSAnLi9Cb29tLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQ29sb3IgPSBmdW5jdGlvbiAoY29sb3I6IHN0cmluZykge1xyXG4gIGlmIChjb2xvci50b0xvd2VyQ2FzZSgpID09PSAnZ3JlZW4nKSB7XHJcbiAgICByZXR1cm4gJ3JnYmEoNTAsIDE3MiwgNDUsIDAuOTcpJztcclxuICB9IGVsc2UgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09ICdvcmFuZ2UnKSB7XHJcbiAgICByZXR1cm4gJ3JnYmEoMjM3LCAxMjksIDQwLCAwLjg5KSc7XHJcbiAgfSBlbHNlIGlmIChjb2xvci50b0xvd2VyQ2FzZSgpID09PSAncmVkJykge1xyXG4gICAgcmV0dXJuICdyZ2JhKDI0NSwgNTQsIDU0LCAwLjkpJztcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGNvbG9yLnRyaW0oKTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBwYXJzZU1hdGggPSBmdW5jdGlvbiAodmFsdWVzdHJpbmc6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgbGV0IHJldHVybnZhbHVlID0gMDtcclxuICBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZignKycpID4gLTEpIHtcclxuICAgIHJldHVybnZhbHVlID0gK3ZhbHVlc3RyaW5nLnNwbGl0KCcrJylbMF0gKyArdmFsdWVzdHJpbmcuc3BsaXQoJysnKVsxXTtcclxuICB9IGVsc2UgaWYgKHZhbHVlc3RyaW5nLmluZGV4T2YoJy0nKSA+IC0xKSB7XHJcbiAgICByZXR1cm52YWx1ZSA9ICt2YWx1ZXN0cmluZy5zcGxpdCgnLScpWzBdIC0gK3ZhbHVlc3RyaW5nLnNwbGl0KCctJylbMV07XHJcbiAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKCcqJykgPiAtMSkge1xyXG4gICAgcmV0dXJudmFsdWUgPSArdmFsdWVzdHJpbmcuc3BsaXQoJyonKVswXSAqICt2YWx1ZXN0cmluZy5zcGxpdCgnKicpWzFdO1xyXG4gIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZignLycpID4gLTEpIHtcclxuICAgIHJldHVybnZhbHVlID0gK3ZhbHVlc3RyaW5nLnNwbGl0KCcvJylbMF0gLyArdmFsdWVzdHJpbmcuc3BsaXQoJy8nKVsxXTtcclxuICB9IGVsc2UgaWYgKHZhbHVlc3RyaW5nLmluZGV4T2YoJ21pbicpID4gLTEpIHtcclxuICAgIHJldHVybnZhbHVlID0gXy5taW4oWyt2YWx1ZXN0cmluZy5zcGxpdCgnbWluJylbMF0sICt2YWx1ZXN0cmluZy5zcGxpdCgnbWluJylbMV1dKSB8fCAwO1xyXG4gIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZignbWF4JykgPiAtMSkge1xyXG4gICAgcmV0dXJudmFsdWUgPSBfLm1heChbK3ZhbHVlc3RyaW5nLnNwbGl0KCdtYXgnKVswXSwgK3ZhbHVlc3RyaW5nLnNwbGl0KCdtYXgnKVsxXV0pIHx8IDA7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKCdtZWFuJykgPiAtMSkge1xyXG4gICAgcmV0dXJudmFsdWUgPSBfLm1lYW4oWyt2YWx1ZXN0cmluZy5zcGxpdCgnYXZnJylbMF0sICt2YWx1ZXN0cmluZy5zcGxpdCgnYXZnJylbMV1dKSB8fCAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm52YWx1ZSA9ICt2YWx1ZXN0cmluZztcclxuICB9XHJcbiAgcmV0dXJuIE1hdGgucm91bmQoK3JldHVybnZhbHVlKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHBhcnNlTWF0aEV4cHJlc3Npb24gPSBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcclxuICBsZXQgdmFsdWVzdHJpbmcgPSBleHByZXNzaW9uLnJlcGxhY2UoL1xcXy9nLCAnJykuc3BsaXQoJywnKVtpbmRleF07XHJcbiAgcmV0dXJuICtwYXJzZU1hdGgodmFsdWVzdHJpbmcpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0Q29sb3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgbGV0IHJldHVyblZhbHVlID1cclxuICAgIChleHByZXNzaW9uIHx8ICcnKS5zcGxpdCgnLCcpLmxlbmd0aCA+IGluZGV4ID8gYCBzdHlsZT1cImNvbG9yOiR7bm9ybWFsaXplQ29sb3IoZXhwcmVzc2lvbi5yZXBsYWNlKC9cXF8vZywgJycpLnNwbGl0KCcsJylbaW5kZXhdKX1cIiBgIDogJyc7XHJcbiAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcmVwbGFjZVRva2VucyA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICB2YWx1ZSA9IHZhbHVlICsgJyc7XHJcbiAgdmFsdWUgPSB2YWx1ZVxyXG4gICAgLnNwbGl0KCcgJylcclxuICAgIC5tYXAoYSA9PiB7XHJcbiAgICAgIGlmIChhLnN0YXJ0c1dpdGgoJ19mYS0nKSAmJiBhLmVuZHNXaXRoKCdfJykpIHtcclxuICAgICAgICBsZXQgcmV0dXJudmFsdWUgPSAnJztcclxuICAgICAgICBsZXQgaWNvbiA9IGEucmVwbGFjZSgvXFxfL2csICcnKS5zcGxpdCgnLCcpWzBdO1xyXG4gICAgICAgIGxldCBjb2xvciA9IGdldENvbG9yKGEsIDEpO1xyXG4gICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoJywnKS5sZW5ndGggPj0gMyA/IHBhcnNlTWF0aEV4cHJlc3Npb24oYSwgMikgOiAxO1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgIGlmIChhLnNwbGl0KCcsJykubGVuZ3RoID49IDQpIHtcclxuICAgICAgICAgIGxldCBtYXhDb2xvciA9IGdldENvbG9yKGEsIDMpO1xyXG4gICAgICAgICAgbGV0IG1heExlbmd0aCA9IGEuc3BsaXQoJywnKS5sZW5ndGggPj0gNSA/IHBhcnNlTWF0aEV4cHJlc3Npb24oYSwgNCkgOiAwO1xyXG4gICAgICAgICAgcmV0dXJudmFsdWUgKz0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7bWF4Q29sb3J9PjwvaT4gYC5yZXBlYXQoXy5tYXgoW21heExlbmd0aCAtIHJlcGVhdENvdW50LCAwXSkgfHwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXR1cm52YWx1ZTtcclxuICAgICAgfSBlbHNlIGlmIChhLnN0YXJ0c1dpdGgoJ19pbWctJykgJiYgYS5lbmRzV2l0aCgnXycpKSB7XHJcbiAgICAgICAgYSA9IGEuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIGxldCBpbWdVcmwgPSBhLnJlcGxhY2UoJ19pbWctJywgJycpLnNwbGl0KCcsJylbMF07XHJcbiAgICAgICAgbGV0IGltZ1dpZHRoID0gYS5zcGxpdCgnLCcpLmxlbmd0aCA+IDEgPyBhLnJlcGxhY2UoJ19pbWctJywgJycpLnNwbGl0KCcsJylbMV0gOiAnMjBweCc7XHJcbiAgICAgICAgbGV0IGltZ0hlaWdodCA9IGEuc3BsaXQoJywnKS5sZW5ndGggPiAyID8gYS5yZXBsYWNlKCdfaW1nLScsICcnKS5zcGxpdCgnLCcpWzJdIDogJzIwcHgnO1xyXG4gICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoJywnKS5sZW5ndGggPiAzID8gK2EucmVwbGFjZSgnX2ltZy0nLCAnJykuc3BsaXQoJywnKVszXSA6IDE7XHJcbiAgICAgICAgYSA9IGA8aW1nIHdpZHRoPVwiJHtpbWdXaWR0aH1cIiBoZWlnaHQ9XCIke2ltZ0hlaWdodH1cIiBzcmM9XCIke2ltZ1VybH1cIi8+YC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBhO1xyXG4gICAgfSlcclxuICAgIC5qb2luKCcgJyk7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZykge1xyXG4gIGlmICghdmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZSArICcnO1xyXG4gIH1cclxuICB2YWx1ZSA9IHZhbHVlICsgJyc7XHJcbiAgcmV0dXJuIHZhbHVlXHJcbiAgICAuc3BsaXQoJyAnKVxyXG4gICAgLm1hcChhID0+IHtcclxuICAgICAgaWYgKGEuc3RhcnRzV2l0aCgnX2ZhLScpICYmIGEuZW5kc1dpdGgoJ18nKSkge1xyXG4gICAgICAgIGEgPSBgYDtcclxuICAgICAgfSBlbHNlIGlmIChhLnN0YXJ0c1dpdGgoJ19pbWctJykgJiYgYS5lbmRzV2l0aCgnXycpKSB7XHJcbiAgICAgICAgYSA9IGBgO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBhO1xyXG4gICAgfSlcclxuICAgIC5qb2luKCcgJyk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRJdGVtQmFzZWRPblRocmVzaG9sZCA9IGZ1bmN0aW9uICh0aHJlc2hvbGRzOiBhbnlbXSwgcmFuZ2VzOiBhbnksIHZhbHVlOiBudW1iZXIsIGRlZmF1bHRWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBsZXQgYyA9IGRlZmF1bHRWYWx1ZTtcclxuICBpZiAodGhyZXNob2xkcyAmJiByYW5nZXMgJiYgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiB0aHJlc2hvbGRzLmxlbmd0aCArIDEgPD0gcmFuZ2VzLmxlbmd0aCkge1xyXG4gICAgcmFuZ2VzID0gXy5kcm9wUmlnaHQocmFuZ2VzLCByYW5nZXMubGVuZ3RoIC0gdGhyZXNob2xkcy5sZW5ndGggLSAxKTtcclxuICAgIGlmIChyYW5nZXNbcmFuZ2VzLmxlbmd0aCAtIDFdID09PSAnJykge1xyXG4gICAgICByYW5nZXNbcmFuZ2VzLmxlbmd0aCAtIDFdID0gZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IHRocmVzaG9sZHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgIGlmICh2YWx1ZSA+PSB0aHJlc2hvbGRzW2kgLSAxXSkge1xyXG4gICAgICAgIHJldHVybiByYW5nZXNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfLmZpcnN0KHJhbmdlcykgfHwgJyc7XHJcbiAgfVxyXG4gIHJldHVybiBjO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0TWV0cmljTmFtZUZyb21UYWdnZWRBbGlhcyA9IGZ1bmN0aW9uICh0YXJnZXQpOiBzdHJpbmcge1xyXG4gIHRhcmdldCA9IHRhcmdldC50cmltKCk7XHJcbiAgbGV0IF9tZXRyaWNuYW1lID0gdGFyZ2V0O1xyXG4gIGlmICh0YXJnZXQuaW5kZXhPZigneycpID4gLTEgJiYgdGFyZ2V0LmluZGV4T2YoJ30nKSA+IC0xICYmIHRhcmdldFt0YXJnZXQubGVuZ3RoIC0gMV0gPT09ICd9Jykge1xyXG4gICAgX21ldHJpY25hbWUgPSB0YXJnZXQuc3BsaXQoJ3snKVswXS50cmltKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIF9tZXRyaWNuYW1lID0gdGFyZ2V0O1xyXG4gIH1cclxuICByZXR1cm4gX21ldHJpY25hbWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRMYWJsZXNGcm9tVGFnZ2VkQWxpYXMgPSBmdW5jdGlvbiAodGFyZ2V0LCBsYWJlbCk6IGFueVtdIHtcclxuICBsZXQgX3RhZ3M6IGFueVtdID0gW107XHJcbiAgdGFyZ2V0ID0gdGFyZ2V0LnRyaW0oKTtcclxuICBsZXQgdGFnc3N0cmluZyA9IHRhcmdldC5yZXBsYWNlKGxhYmVsLCAnJykudHJpbSgpO1xyXG4gIGlmICh0YWdzc3RyaW5nLnN0YXJ0c1dpdGgoJ3snKSAmJiB0YWdzc3RyaW5nLmVuZHNXaXRoKCd9JykpIHtcclxuICAgIC8vIFNuaXBwZXQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ3JhZmFuYS9ncmFmYW5hL2Jsb2IvM2YxNTE3MDkxNGMzMTg5ZWU3ODM1ZjBiMTlmZjUwMGRiMTEzYWY3My9wYWNrYWdlcy9ncmFmYW5hLWRhdGEvc3JjL3V0aWxzL2xhYmVscy50c1xyXG4gICAgY29uc3QgcGFyc2VQcm9tZXRoZXVzTGFiZWxzID0gZnVuY3Rpb24gKGxhYmVsczogc3RyaW5nKSB7XHJcbiAgICAgIGNvbnN0IGxhYmVsc0J5S2V5OiBhbnkgPSB7fTtcclxuICAgICAgbGFiZWxzLnJlcGxhY2UoL1xcYihcXHcrKSghPz1+PylcIihbXlwiXFxuXSo/KVwiL2csIChfXywga2V5LCBvcGVyYXRvciwgdmFsdWUpID0+IHtcclxuICAgICAgICBpZiAoIW9wZXJhdG9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhvcGVyYXRvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhYmVsc0J5S2V5W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gbGFiZWxzQnlLZXk7XHJcbiAgICB9O1xyXG4gICAgXy5lYWNoKHBhcnNlUHJvbWV0aGV1c0xhYmVscyh0YWdzc3RyaW5nKSwgKGs6IHN0cmluZywgdjogc3RyaW5nKSA9PiB7XHJcbiAgICAgIF90YWdzLnB1c2goeyB0YWc6IHYsIHZhbHVlOiBrIH0pO1xyXG4gICAgfSk7XHJcbiAgICBpZiAodGFnc3N0cmluZy5pbmRleE9mKCc6JykgPiAtMSAmJiBfdGFncy5sZW5ndGggPT09IDApIHtcclxuICAgICAgbGV0IGxhYmVsX3ZhbHVlcyA9XHJcbiAgICAgICAgdGFnc3N0cmluZ1xyXG4gICAgICAgICAgLnNsaWNlKDEpXHJcbiAgICAgICAgICAudHJpbSgpXHJcbiAgICAgICAgICAuc2xpY2UoMCwgLTEpXHJcbiAgICAgICAgICAudHJpbSgpIHx8ICcnO1xyXG4gICAgICBfdGFncyA9IGxhYmVsX3ZhbHVlc1xyXG4gICAgICAgIC5zcGxpdCgnLCcpXHJcbiAgICAgICAgLm1hcChpdGVtID0+IChpdGVtIHx8ICcnKS50cmltKCkpXHJcbiAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0gJiYgaXRlbS5pbmRleE9mKCc6JykgPiAtMSlcclxuICAgICAgICAubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgaWYgKGl0ZW0uc3BsaXQoJzonKS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgbGV0IHJldDogYW55ID0ge307XHJcbiAgICAgICAgICAgIHJldC50YWcgPSBpdGVtLnNwbGl0KCc6JylbMF0udHJpbSgpO1xyXG4gICAgICAgICAgICByZXQudmFsdWUgPSBpdGVtLnNwbGl0KCc6JylbMV0udHJpbSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBfdGFncztcclxufTtcclxuZXhwb3J0IGNvbnN0IHJlcGxhY2VfdGFnc19mcm9tX2ZpZWxkID0gZnVuY3Rpb24gKGZpZWxkOiBzdHJpbmcsIHRhZ3M6IGFueVtdKTogc3RyaW5nIHtcclxuICBpZiAodGFncyAmJiB0YWdzLmxlbmd0aCA+IDApIHtcclxuICAgIGZpZWxkID0gdGFncy5yZWR1Y2UoKHIsIGl0KSA9PiB7XHJcbiAgICAgIHJldHVybiByLnJlcGxhY2UobmV3IFJlZ0V4cCgne3snICsgaXQudGFnLnRyaW0oKSArICd9fScsICdnJyksIGl0LnZhbHVlKS5yZXBsYWNlKC9cXFwiL2csICcnKTtcclxuICAgIH0sIGZpZWxkKTtcclxuICB9XHJcbiAgcmV0dXJuIGZpZWxkO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0U2VyaWVzVmFsdWUgPSBmdW5jdGlvbiAoc2VyaWVzOiBhbnksIHN0YXRUeXBlOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gIGxldCB2YWx1ZSA9IE5hTjtcclxuICBzdGF0VHlwZSA9IChzdGF0VHlwZSB8fCAnJykudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoc2VyaWVzKSB7XHJcbiAgICBpZiAoc3RhdFR5cGUgPT09ICdsYXN0X3RpbWUnICYmIHNlcmllcy5kYXRhcG9pbnRzICYmIHNlcmllcy5kYXRhcG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKF8ubGFzdChzZXJpZXMuZGF0YXBvaW50cykpIHtcclxuICAgICAgICB2YWx1ZSA9IF8ubGFzdChzZXJpZXMuZGF0YXBvaW50cylbMV07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc3RhdFR5cGUgPT09ICdsYXN0X3RpbWVfbm9ubnVsbCcpIHtcclxuICAgICAgbGV0IG5vbl9udWxsX2RhdGEgPSBzZXJpZXMuZGF0YXBvaW50cy5maWx0ZXIocyA9PiBzWzBdKTtcclxuICAgICAgaWYgKF8ubGFzdChub25fbnVsbF9kYXRhKSAmJiBfLmxhc3Qobm9uX251bGxfZGF0YSlbMV0pIHtcclxuICAgICAgICB2YWx1ZSA9IF8ubGFzdChub25fbnVsbF9kYXRhKVsxXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzZXJpZXMuc3RhdHMpIHtcclxuICAgICAgdmFsdWUgPSBzZXJpZXMuc3RhdHNbc3RhdFR5cGVdIHx8IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB2YWx1ZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRUaW1lU3RhbXAgPSBmdW5jdGlvbiAoZGF0YVBvaW50czogYW55W10pOiBEYXRlIHtcclxuICBsZXQgY3VycmVudFRpbWVTdGFtcCA9IG5ldyBEYXRlKCk7XHJcbiAgaWYgKGRhdGFQb2ludHMgJiYgZGF0YVBvaW50cy5sZW5ndGggPiAwICYmIF8ubGFzdChkYXRhUG9pbnRzKS5sZW5ndGggPT09IDIpIHtcclxuICAgIGN1cnJlbnRUaW1lU3RhbXAgPSBuZXcgRGF0ZShfLmxhc3QoZGF0YVBvaW50cylbMV0pO1xyXG4gIH1cclxuICByZXR1cm4gY3VycmVudFRpbWVTdGFtcDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHJlcGxhY2VEZWxpbWl0ZWRDb2x1bW5zID0gZnVuY3Rpb24gKGlucHV0c3RyaW5nOiBzdHJpbmcsIHNlcmllc05hbWU6IHN0cmluZywgZGVsaW1pdGVyOiBzdHJpbmcsIHJvd19jb2xfd3JhcHBlcjogc3RyaW5nKTogc3RyaW5nIHtcclxuICBsZXQgb3V0cHV0U3RyaW5nID0gc2VyaWVzTmFtZS5zcGxpdChkZWxpbWl0ZXIgfHwgJy4nKS5yZWR1Y2UoKHIsIGl0LCBpKSA9PiB7XHJcbiAgICByZXR1cm4gci5yZXBsYWNlKG5ldyBSZWdFeHAocm93X2NvbF93cmFwcGVyICsgaSArIHJvd19jb2xfd3JhcHBlciwgJ2cnKSwgaXQpO1xyXG4gIH0sIGlucHV0c3RyaW5nKTtcclxuICByZXR1cm4gb3V0cHV0U3RyaW5nO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0Um93TmFtZSA9IGZ1bmN0aW9uIChcclxuICByb3dfbmFtZTogc3RyaW5nLFxyXG4gIGRlbGltaXRlcjogc3RyaW5nLFxyXG4gIHJvd19jb2xfd3JhcHBlcjogc3RyaW5nLFxyXG4gIHNlcmllc05hbWU6IHN0cmluZyxcclxuICBfbWV0cmljbmFtZTogc3RyaW5nLFxyXG4gIF90YWdzOiBhbnlbXVxyXG4pOiBzdHJpbmcge1xyXG4gIGlmIChkZWxpbWl0ZXIudG9Mb3dlckNhc2UoKSA9PT0gJ3RhZycpIHtcclxuICAgIHJvd19uYW1lID0gcm93X25hbWUucmVwbGFjZShuZXcgUmVnRXhwKCd7e21ldHJpY19uYW1lfX0nLCAnZycpLCBfbWV0cmljbmFtZSk7XHJcbiAgICByb3dfbmFtZSA9IHJlcGxhY2VfdGFnc19mcm9tX2ZpZWxkKHJvd19uYW1lLCBfdGFncyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJvd19uYW1lID0gcmVwbGFjZURlbGltaXRlZENvbHVtbnMocm93X25hbWUsIHNlcmllc05hbWUsIGRlbGltaXRlciwgcm93X2NvbF93cmFwcGVyKTtcclxuICAgIGlmIChzZXJpZXNOYW1lLnNwbGl0KGRlbGltaXRlciB8fCAnLicpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICByb3dfbmFtZSA9IHNlcmllc05hbWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByb3dfbmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJ19zZXJpZXNfJywgJ2cnKSwgc2VyaWVzTmFtZS50b1N0cmluZygpKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldENvbE5hbWUgPSBmdW5jdGlvbiAoXHJcbiAgY29sX25hbWU6IHN0cmluZyxcclxuICBkZWxpbWl0ZXI6IHN0cmluZyxcclxuICByb3dfY29sX3dyYXBwZXI6IHN0cmluZyxcclxuICBzZXJpZXNOYW1lOiBzdHJpbmcsXHJcbiAgcm93X25hbWU6IHN0cmluZyxcclxuICBfbWV0cmljbmFtZTogc3RyaW5nLFxyXG4gIF90YWdzOiBhbnlbXVxyXG4pOiBzdHJpbmcge1xyXG4gIGlmIChkZWxpbWl0ZXIudG9Mb3dlckNhc2UoKSA9PT0gJ3RhZycpIHtcclxuICAgIGNvbF9uYW1lID0gY29sX25hbWUucmVwbGFjZShuZXcgUmVnRXhwKCd7e21ldHJpY19uYW1lfX0nLCAnZycpLCBfbWV0cmljbmFtZSk7XHJcbiAgICByb3dfbmFtZSA9IHJlcGxhY2VfdGFnc19mcm9tX2ZpZWxkKGNvbF9uYW1lLCBfdGFncyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbF9uYW1lID0gcmVwbGFjZURlbGltaXRlZENvbHVtbnMoY29sX25hbWUsIHNlcmllc05hbWUsIGRlbGltaXRlciwgcm93X2NvbF93cmFwcGVyKTtcclxuICAgIGlmIChzZXJpZXNOYW1lLnNwbGl0KGRlbGltaXRlciB8fCAnLicpLmxlbmd0aCA9PT0gMSB8fCByb3dfbmFtZSA9PT0gc2VyaWVzTmFtZSkge1xyXG4gICAgICBjb2xfbmFtZSA9IGNvbF9uYW1lIHx8ICdWYWx1ZSc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjb2xfbmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJ19zZXJpZXNfJywgJ2cnKSwgc2VyaWVzTmFtZS50b1N0cmluZygpKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldERpc3BsYXlWYWx1ZVRlbXBsYXRlID0gZnVuY3Rpb24gKFxyXG4gIHZhbHVlOiBudW1iZXIsXHJcbiAgcGF0dGVybjogSUJvb21QYXR0ZXJuLFxyXG4gIHNlcmllc05hbWU6IHN0cmluZyxcclxuICByb3dfY29sX3dyYXBwZXI6IHN0cmluZyxcclxuICB0aHJlc2hvbGRzOiBhbnlbXVxyXG4pOiBzdHJpbmcge1xyXG4gIGxldCB0ZW1wbGF0ZSA9ICdfdmFsdWVfJztcclxuICBpZiAoXy5pc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgIHRlbXBsYXRlID0gcGF0dGVybi5udWxsX3ZhbHVlIHx8ICdObyBkYXRhJztcclxuICAgIGlmIChwYXR0ZXJuLm51bGxfdmFsdWUgPT09ICcnKSB7XHJcbiAgICAgIHRlbXBsYXRlID0gJyc7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRlbXBsYXRlID0gcGF0dGVybi5kaXNwbGF5VGVtcGxhdGUgfHwgdGVtcGxhdGU7XHJcbiAgICBpZiAocGF0dGVybi5lbmFibGVfdHJhbnNmb3JtKSB7XHJcbiAgICAgIGxldCB0cmFuc2Zvcm1fdmFsdWVzID0gcGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzLnNwbGl0KCd8Jyk7XHJcbiAgICAgIHRlbXBsYXRlID0gZ2V0SXRlbUJhc2VkT25UaHJlc2hvbGQodGhyZXNob2xkcywgdHJhbnNmb3JtX3ZhbHVlcywgdmFsdWUsIHRlbXBsYXRlKTtcclxuICAgIH1cclxuICAgIGlmIChwYXR0ZXJuLmVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzICYmIHBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMgIT09ICcnKSB7XHJcbiAgICAgIGxldCBfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMgPSBwYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzXHJcbiAgICAgICAgLnNwbGl0KCd8JylcclxuICAgICAgICAuZmlsdGVyKGNvbiA9PiBjb24uaW5kZXhPZignLT4nKSlcclxuICAgICAgICAubWFwKGNvbiA9PiBjb24uc3BsaXQoJy0+JykpXHJcbiAgICAgICAgLmZpbHRlcihjb24gPT4gK2NvblswXSA9PT0gdmFsdWUpXHJcbiAgICAgICAgLm1hcChjb24gPT4gY29uWzFdKTtcclxuICAgICAgaWYgKF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcy5sZW5ndGggPiAwICYmIF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlc1swXSAhPT0gJycpIHtcclxuICAgICAgICB0ZW1wbGF0ZSA9ICgnJyArIF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlc1swXSkudHJpbSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocGF0dGVybi5lbmFibGVfdHJhbnNmb3JtIHx8IHBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXMpIHtcclxuICAgICAgdGVtcGxhdGUgPSByZXBsYWNlRGVsaW1pdGVkQ29sdW1ucyh0ZW1wbGF0ZSwgc2VyaWVzTmFtZSwgcGF0dGVybi5kZWxpbWl0ZXIsIHJvd19jb2xfd3JhcHBlcik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0ZW1wbGF0ZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRvZXNWYWx1ZU5lZWRzVG9IaWRlID0gZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIsIGZpbHRlcjogYW55KTogYm9vbGVhbiB7XHJcbiAgbGV0IGhpZGRlbiA9IGZhbHNlO1xyXG4gIGlmICgodmFsdWUgfHwgdmFsdWUgPT09IDApICYmIGZpbHRlciAmJiAoZmlsdGVyLnZhbHVlX2JlbG93ICE9PSAnJyB8fCBmaWx0ZXIudmFsdWVfYWJvdmUgIT09ICcnKSkge1xyXG4gICAgaWYgKGZpbHRlci52YWx1ZV9iZWxvdyAhPT0gJycgJiYgdmFsdWUgPCArZmlsdGVyLnZhbHVlX2JlbG93KSB7XHJcbiAgICAgIGhpZGRlbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVyLnZhbHVlX2Fib3ZlICE9PSAnJyAmJiB2YWx1ZSA+ICtmaWx0ZXIudmFsdWVfYWJvdmUpIHtcclxuICAgICAgaGlkZGVuID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGhpZGRlbjtcclxufTtcclxuIl19