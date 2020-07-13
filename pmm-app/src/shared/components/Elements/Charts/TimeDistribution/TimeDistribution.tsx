import React from 'react';
import HSBar from 'react-horizontal-stacked-bar-chart';
import { humanize } from '../../../helpers/Humanization';
// eslint-disable-next-line max-len
import { METRICS_COLORS, PERCENT_COUNT, TIME_METRICS } from './TimeDistribution.constants';

export const getMetricDistribution = (data) => {
  let totalValue = 0;
  const timeMetrics = data.filter((metric) => {
    if (metric.metricName === 'query_time') {
      totalValue = metric.metric.sum;

      return false;
    }

    return TIME_METRICS.includes(metric.metricName);
  });
  let currentPercent = PERCENT_COUNT;

  const normalizedTimeMetrics = timeMetrics
    .map((metric) => {
      const {
        name,
        metricName,
        metric: { sum },
      } = metric;

      const percentage = sum / (totalValue / PERCENT_COUNT);
      const value = Math.max(percentage, 1);

      currentPercent -= percentage;

      return {
        name,
        value,
        description: humanize.transform(percentage / PERCENT_COUNT, 'percent'),
        color: METRICS_COLORS[metricName],
      };
    })
    .sort((a, b) => b.value - a.value);

  if (currentPercent < PERCENT_COUNT || timeMetrics.length === 0) {
    normalizedTimeMetrics.push({
      name: 'Other',
      value: currentPercent,
      description: humanize.transform(currentPercent / PERCENT_COUNT, 'percent'),
      color: 'gray',
    });
  }

  return normalizedTimeMetrics;
};

export const TimeDistribution = ({ data }) => {
  const normalizedTimeMetrics = getMetricDistribution(data);

  return (
    <>
      <HSBar height={30} showTextIn id="query-time-chart" fontColor="white" data={normalizedTimeMetrics} />
    </>
  );
};
