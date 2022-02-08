import { ChartData } from 'chart.js';
import { GrafanaTheme2 } from '@grafana/data';
import { HistogramAPI } from './Metrics.types';

export const getChartDataFromHistogramItems = (histogram_items: HistogramAPI[], theme: GrafanaTheme2): ChartData<'bar'>| undefined => {
  const total = histogram_items ? histogram_items.reduce(
    (previousValue, currentValue) => (
      currentValue.frequency ? previousValue + currentValue.frequency : previousValue
    ), 0,
  ) : null;

  const ranges = histogram_items.map(({ range }) => formatRange(range));
  const frequencies = histogram_items.map(({ frequency }) => frequency || 0);
  const dataInPersent = total !== null
    ? histogram_items.map(({ frequency }) => Math.round((frequency || 0 / total) * 10000) / 100)
    : histogram_items.map(() => undefined);

  const dataSet = {
    data: frequencies,
    backgroundColor: theme?.v1.colors.bg3,
    dataInPersent,
  };

  return histogram_items.length > 0 ? {
    labels: ranges,
    datasets: [dataSet],
  } : undefined;
};

export const formatRange = (range: string) => {
  const newRange = range.replace(/[() ]/g, '').split('-');
  const start = formatMilliseconds(newRange[0]);
  const end = formatMilliseconds(newRange[1]);

  return `${start} - ${end}`;
};

export const formatMilliseconds = (ms: string) => {
  const time = +ms;

  return time >= 1000 ? `${Math.round(time / 1000)}s` : `${time}ms`;
};
