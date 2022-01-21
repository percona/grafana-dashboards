import {
  applyFieldOverrides, DataFrame, FieldType, GrafanaTheme2, toDataFrame,
} from '@grafana/data';
import { HistogramResponse } from './Metrics.types';

export const histogramToDataFrame = ({
  histogram_items = [],
}: HistogramResponse,
theme: GrafanaTheme2): DataFrame[] => {
  const ranges = histogram_items.map(({ range }) => formatRange(range));
  const frequencies = histogram_items.map(({ frequency }) => frequency || 0);
  const fields = {
    fields: [
      { name: 'x', type: FieldType.string, values: ranges },
      { name: '', type: FieldType.number, values: frequencies },
    ],
  };
  const frame = toDataFrame(fields);
  const data = applyFieldOverrides({
    data: [frame],
    fieldConfig: {
      overrides: [],
      defaults: {},
    },
    theme,
    replaceVariables: (value: string) => value,
  });
  const hasData = frequencies.filter((f) => f !== 0).length > 0;

  return hasData ? data : [];
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
