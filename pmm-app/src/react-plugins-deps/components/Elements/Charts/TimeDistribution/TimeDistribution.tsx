import React from 'react';
import HSBar from 'react-horizontal-stacked-bar-chart';
import { Humanize } from '../../../../helpers/Humanization';
import { DATABASE } from '../../../../../pmm-qan-app-panel/components/Details/Details.constants';
import { METRICS_COLORS, PERCENT_COUNT, TIME_METRICS } from './TimeDistribution.constants';

export const getMetricDistribution = data => {
  let totalValue = 0;
  const timeMetrics = data.filter(metric => {
    if (metric.metricName === 'query_time') {
      totalValue = metric.metric.sum;
      return false;
    }

    return TIME_METRICS.includes(metric.metricName);
  });
  let currentPercent = PERCENT_COUNT;

  const normalizedTimeMetrics = timeMetrics
    .map(metric => {
      const {
        name,
        metricName,
        metric: { sum },
      } = metric;

      const percentage = sum / (totalValue / PERCENT_COUNT);
      const value = Math.max(percentage, 1);
      currentPercent -= percentage;
      return {
        name: name,
        value: value,
        description: Humanize.transform(percentage / PERCENT_COUNT, 'percent'),
        color: METRICS_COLORS[metricName],
      };
    })
    .sort((a, b) => b.value - a.value);

  if (currentPercent < PERCENT_COUNT || timeMetrics.length === 0) {
    normalizedTimeMetrics.push({
      name: 'Other',
      value: currentPercent,
      description: Humanize.transform(currentPercent / PERCENT_COUNT, 'percent'),
      color: 'gray',
    });
  }

  return normalizedTimeMetrics;
};

export const TimeDistribution = ({ data, databaseType }) => {
  if (databaseType !== DATABASE.mysql) {
    return null;
  }
  const normalizedTimeMetrics = getMetricDistribution(data);
  return (
    <>
      <h4>Query time distribution</h4>
      <HSBar height={30} showTextIn id="query-time-chart" fontColor="white" data={normalizedTimeMetrics} />
    </>
  );
};
