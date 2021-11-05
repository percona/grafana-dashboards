const AVG = 'AVG';
const SUM = 'SUM';
const CNT = 'CNT';
const MIN = 'MIN';
const MAX = 'MAX';
const FIRST = 'FIRST';
const LAST = 'LAST';

const sum = (values) => values.reduce((s, n) => s + n, 0);

const min = (values) => Math.min(...values);

const max = (values) => Math.max(...values);

const aggregates = {
  [AVG]: (values) => sum(values) / values.length,
  [SUM]: (values) => sum(values),
  [CNT]: (values) => values.length,
  [MIN]: (values) => min(values),
  [MAX]: (values) => max(values),
  [FIRST]: (values) => values.length == 0 ? null : values[0],
  [LAST]: (values) => values.length == 0 ? null : values[values.length - 1]
};

export const aggregate = (type) => {
  const func = aggregates[type];
  return (values) => func(values);
};

export const aggregatesMap = [
  { name: 'Average', value: AVG },
  { name: 'Sum', value: SUM },
  { name: 'Count', value: CNT },
  { name: 'Min', value: MIN },
  { name: 'Max', value: MAX },
  { name: 'First', value: FIRST },
  { name: 'Last', value: LAST }
];

export default {
  AVG,
  SUM,
  CNT,
  MIN,
  MAX,
  FIRST,
  LAST
};