import {each, isArray} from 'lodash-es';

export default class SqlSeries {
    series: any;
    keys: any;
    meta: any;
    tillNow: any;
    from: any;
    to: any;

    /** @ngInject */
    constructor(options) {
        this.series = options.series;
        this.meta = options.meta;
        this.tillNow = options.tillNow;
        this.from = options.from;
        this.to = options.to;
        this.keys = options.keys || [];
    }

    toTable(): any {
        let self = this, data = [];
        if (this.series.length === 0) {
            return data;
        }

        let columns = [];
        each(self.meta, function (col) {
            columns.push({"text": col.name, "type": SqlSeries._toJSType(col.type)});
        });

        let rows = [];
        each(self.series, function (ser) {
            let r = [];
            each(ser, function (v) {
                r.push(v);
            });
            rows.push(r);
        });

        data.push({
            "columns": columns,
            "rows": rows,
            "type": "table"
        });

        return data;
    }

    toTimeSeries(extrapolate = true): any {
        let self = this, timeSeries = [];
        if (self.series.length === 0) {
            return timeSeries;
        }

        let metrics = {};
        // timeCol have to be the first column always
        let timeCol = self.meta[0];
        let lastTimeStamp = self.series[0][timeCol.name];
        let keyColumns = self.keys.filter(name => name !== timeCol.name);
        each(self.series, function (row) {
            let t = SqlSeries._formatValue(row[timeCol.name]);
            /* Build composite key (categories) from GROUP BY */
            let metricKey = null;
            if (keyColumns.length > 0) {
                metricKey = keyColumns.map(name => row[name]).join(', ');
            }
            /* Make sure all series end with a value or nil for current timestamp
             * to render discontiguous timeseries properly. */
            if (lastTimeStamp < t) {
                each(metrics, function (datapoints, seriesName) {
                    if (datapoints[datapoints.length - 1][1] < lastTimeStamp) {
                        datapoints.push([null, lastTimeStamp]);
                    }
                });
                lastTimeStamp = t;
            }
            /* For each metric-value pair in row, construct a datapoint */
            each(row, function (val, key) {
                /* Skip timestamp and GROUP BY keys */
                if ((self.keys.length === 0 && timeCol.name === key) || self.keys.indexOf(key) >= 0) {
                    return;
                }
                /* If composite key is specified, e.g. 'category1',
                 * use it instead of the metric name, e.g. count() */
                if (metricKey) {
                    key = metricKey;
                }
                if (isArray(val)) {
                    /* Expand groupArray into multiple timeseries */
                    each(val, function (arr) {
                        SqlSeries._pushDatapoint(metrics, t, arr[0], arr[1]);
                    });
                } else {
                    SqlSeries._pushDatapoint(metrics, t, key, val);
                }
            });
        });

        each(metrics, function (datapoints, seriesName) {
            if (extrapolate) {
                timeSeries.push({target: seriesName, datapoints: self.extrapolate(datapoints)});
            } else {
                timeSeries.push({target: seriesName, datapoints: datapoints});
            }
        });

        return timeSeries;
    }

    extrapolate(datapoints) {
        if (datapoints.length < 10 || (!this.tillNow && datapoints[0][0] !== 0)) {
            return datapoints;
        }

        // Duration between first/last samples and boundary of range.
        let durationToStart = datapoints[0][1] / 1000 - this.from,
            durationToEnd = this.to - datapoints[datapoints.length - 1][1] / 1000;

        // If the first/last samples are close to the boundaries of the range,
        // extrapolate the result.
        let sampledInterval = (datapoints[datapoints.length - 1][1] - datapoints[0][1]) / 1000,
            averageDurationBetweenSamples = sampledInterval / (datapoints.length - 1);

        let diff;
        // close to left border and value is 0 because of runningDifference function
        if (durationToStart < averageDurationBetweenSamples && datapoints[0][0] === 0) {
            diff = ((datapoints[1][0] - datapoints[2][0]) / datapoints[1][0]) * 0.1;
            diff %= 1;
            if (isNaN(diff)) {
                diff = 0;
            }
            datapoints[0][0] = datapoints[1][0] * (1 + diff);
        }

        if (durationToEnd < averageDurationBetweenSamples) {
            let l = datapoints.length;
            diff = ((datapoints[l - 2][0] - datapoints[l - 3][0]) / datapoints[l - 2][0]) * 0.1;
            diff %= 1;
            if (isNaN(diff)) {
                diff = 0;
            }
            datapoints[l - 1][0] = datapoints[l - 2][0] * (1 + diff);
        }

        return datapoints;
    }

    static _pushDatapoint(metrics: any, timestamp: number, key: string, value: number) {
        if (!metrics[key]) {
            metrics[key] = [];
            /* Fill null values for each new series */
            for (var seriesName in metrics) {
                metrics[seriesName].forEach(v => {
                    if (v[1] < timestamp) {
                        metrics[key].push([null, v[1]]);
                    }
                });
                break;
            }
        }

        metrics[key].push([SqlSeries._formatValue(value), timestamp]);
    }

    static _toJSType(type: any): string {
        switch (type) {
            case 'UInt8':
            case 'UInt16':
            case 'UInt32':
            case 'UInt64':
            case 'Int8':
            case 'Int16':
            case 'Int32':
            case 'Int64':
            case 'Float32':
            case 'Float64':
            case 'Decimal':
            case 'Decimal32':
            case 'Decimal64':
            case 'Decimal128':
            case 'Nullable(UInt8)':
            case 'Nullable(UInt16)':
            case 'Nullable(UInt32)':
            case 'Nullable(UInt64)':
            case 'Nullable(Int8)':
            case 'Nullable(Int16)':
            case 'Nullable(Int32)':
            case 'Nullable(Int64)':
            case 'Nullable(Float32)':
            case 'Nullable(Float64)':
            case 'Nullable(Decimal)':
            case 'Nullable(Decimal32)':
            case 'Nullable(Decimal64)':
            case 'Nullable(Decimal128)':
                return "number";
            default:
                return "string";
        }
    }

    static _formatValue(value: any) {
        if (value === null) {
            return value;
        }

        let numeric = Number(value);
        if (isNaN(numeric)) {
            return value;
        } else {
            return numeric;
        }
    }
}
