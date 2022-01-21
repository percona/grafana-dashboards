// import { VizOrientation } from '@grafana/data';
// import { StackingMode, BarValueVisibility, LegendDisplayMode } from '@grafana/ui';
import { Messages } from '../Details.messages';

export const HISTOGRAM_HEIGHT = 400;
export const HISTOGRAM_MARGIN = 20;

export const MetricsTabs = {
  distribution: Messages.tabs.details.sections.timeDistribution,
  metrics: Messages.tabs.details.sections.metrics,
  histogram: Messages.tabs.details.sections.histogram,
  topQuery: Messages.tabs.details.sections.topQuery,
};

// export const HISTOGRAM_OPTIONS: BarChartOptions = {
//   orientation: VizOrientation.Horizontal,
//   legend: { displayMode: LegendDisplayMode.Hidden, placement: 'bottom', calcs: [] },
//   stacking: StackingMode.None,
//   showValue: BarValueVisibility.Always,
//   barWidth: 0.9,
//   groupWidth: 1,
// };
