import { ChartData } from 'chart.js';
import { GrafanaTheme2 } from '@grafana/data';
import { HistogramAPI } from './Metrics.types';

export const getChartDataFromHistogramItems = (histogram_items: HistogramAPI[], theme: GrafanaTheme2): ChartData<'bar'>| undefined => {
  if (histogram_items && histogram_items.length > 0) {
    const total = histogram_items.reduce(
      (previousValue, { frequency }) => (
        frequency ? previousValue + frequency : previousValue
      ), 0,
    );

    const ranges = histogram_items.map(({ range }) => formatRange(range));
    const frequencies = histogram_items.map(({ frequency }) => frequency || 0);
    const dataInPersent = total
      ? histogram_items.map(({ frequency }) => ((frequency || 0) / total) * 100)
      : undefined;

    const dataSet = {
      data: frequencies,
      backgroundColor: theme?.v1.colors.bg3,
      dataInPersent,
    };

    return {
      labels: ranges,
      datasets: [dataSet],
    };
  }

  return undefined;
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
