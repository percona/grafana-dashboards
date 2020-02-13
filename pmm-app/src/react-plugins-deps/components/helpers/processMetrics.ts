const getPercentOfTotal = (current, total) => {
  const key = current.sum ? 'sum' : 'sum_per_sec';
  return +((+current[key] / +total[key]) * 100).toFixed(2);
};

const getSparkline = (sparklines, metricName) => {
  return sparklines.map(sparkline => {
    const key = Object.keys(sparkline).find(sparklineKey => sparklineKey.includes(metricName));
    return {
      point: sparkline.point,
      time_frame: sparkline.time_frame,
      timestamp: sparkline.timestamp,
      metric: key ? sparkline[key] : '',
    };
  });
};

export const processMetrics = (metricsCatalogue, metrics) => {
  if (!metrics.metrics) {
    return [];
  }
  const metricsList = Object.keys(metrics.metrics);
  return metricsList
    .filter(metric => Object.keys(metrics.metrics[metric]).length !== 0 && metrics.totals[metric])
    .map(metricName => {
      const metric = metrics.metrics[metricName];
      const sparkline = getSparkline(metrics.sparkline, metricName);
      const total = metrics.totals[metricName];

      return {
        name: metricsCatalogue[metricName].humanizeName,
        tooltip: metricsCatalogue[metricName].tooltipText,
        pipeTypes: metricsCatalogue[metricName].pipeTypes,
        units: metricsCatalogue[metricName].units,
        complexMetric: metricsCatalogue[metricName].metricRelation(metrics.metrics),
        sparkline: sparkline,
        metric: metric,
        total: total,
        queryCount: metrics.metrics['num_queries'].sum,
        percentOfTotal: getPercentOfTotal(metric, total),
        isRate: metric.rate >= 0,
        isSum: metric.sum >= 0,
        isStats: metric.avg >= 0,
        isLatencyChart: metric.min && metric.max,
      };
    })
    .filter(item => item.percentOfTotal);
};
