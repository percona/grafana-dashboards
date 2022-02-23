import { ChartData } from 'chart.js';

export const useHistogram = (): [ChartData<'bar'>|undefined, boolean] => ([
  undefined, false,
]);
