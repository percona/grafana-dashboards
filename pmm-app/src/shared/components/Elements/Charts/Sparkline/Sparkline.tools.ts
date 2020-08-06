import * as moment from 'moment';

export const getMetricSparklineKey = (metricName) => {
  switch (metricName) {
    case 'load':
      return 'load';
    case 'num_queries':
      return 'num_queries_per_sec';
    case 'num_queries_with_warnings':
      return 'num_queries_with_warnings_per_sec';
    case 'num_queries_with_errors':
      return 'num_queries_with_errors_per_sec';
    default:
      return `m_${metricName}_sum_per_sec`;
  }
};
export const getAdditionalPoint = (last, previous) => new Date(
  (+moment.utc(last) || 0) - ((+moment.utc(previous) || 0) - (+moment.utc(last) || 0)),
).toISOString();
export const isMetricExists = (metric) => metric === 'NaN' || metric === undefined || metric === '';
export const findYRange = (array, key) => {
  const values = array.map((arrayItem) => +arrayItem[key] || 0);

  return [Math.max(...values) || 1, Math.min(...values) || 0];
};
export const findXRange = (array, key) => {
  const values = array.map((arrayItem) => +moment.utc(arrayItem[key]) || 0);

  return [Math.max(...values), Math.min(...values)];
};
