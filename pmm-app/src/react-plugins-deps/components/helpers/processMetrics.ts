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

const sortDetails = (a, b) => {
  const order = [
    'num_queries',
    'num_queries_with_errors',
    'num_queries_with_warnings',
    'query_time',
    'lock_time',
    'rows_sent',
    'rows_examined',
    '',
  ];

  let indA = order.indexOf(a);
  let indB = order.indexOf(b);

  if (indA === -1) {
    indA = order.length - 1;
  }

  if (indB === -1) {
    indB = order.length - 1;
  }

  return indA < indB ? -1 : 1;
};

export const processMetrics = (metricsCatalogue, metrics) => {
  return (
    Object.entries(metrics.metrics ? metrics.metrics : metrics.totals)
      .filter(metricData => Object.keys(metricData[1]).length)
      .filter(metricData => !(metricData[1]['cnt'] !== 0 && metricData[1]['sum'] === undefined))
      .sort(sortDetails)
      .map(metricData => {
        const [metricName] = metricData;
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
  );
};
