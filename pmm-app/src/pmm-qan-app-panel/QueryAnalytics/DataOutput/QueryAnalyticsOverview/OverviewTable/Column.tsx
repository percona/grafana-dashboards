// import { METRIC_CATALOGUE } from '../data/metric-catalogue';
import AddColumn from '../AddColumn';
import React from 'react';
import PolygonChart from '../../../../../react-plugins-deps/components/PolygonChart/PolygonChart';
import LatencyChart from '../../../../../react-plugins-deps/components/LatencyChart/LatencyChart';

import './OverviewTable.scss';
import { Humanize } from '../../../../../react-plugins-deps/components/helpers/Humanize';
import { METRIC_CATALOGUE } from '../../metric-catalogue';

export const getColumnName = (metricName, columnIndex, totalValues, orderBy) => {
  const metric = METRIC_CATALOGUE[metricName];
  let sortOrder = false;
  if (orderBy === metricName) {
    sortOrder = 'ascend';
  } else if (orderBy === `-${metricName}`) {
    sortOrder = 'descend';
  }
  return {
    sorter: true,
    key: metricName,
    defaultSortOrder: sortOrder,
    title: () => <AddColumn placeholder={metricName} currentMetric={metric} />,
    render: (text, item) => {
      const stats = item.metrics[metricName].stats;
      return (
        <div className={'overview-content-column'}>
          {columnIndex === 0 && <PolygonChart width={150} data={item.sparkline} />}
          <span className="per-unit" style={{ marginRight: '10px' }}></span>
          <span className="summarize" style={{ marginRight: '10px' }}>
            {Humanize.transform(stats.qps || stats.sum_per_sec, 'number')}
          </span>
          <span className="per-unit" style={{ marginRight: '10px' }}>
            {stats.sum && Humanize.transform(stats.sum, metric.pipeTypes.sumPipe)}
          </span>

          <span className="total-percentage" style={{ marginRight: '10px' }}>
            {((stats.sum_per_sec / totalValues.metrics[metricName].stats.sum_per_sec) * 100).toFixed(2) + '%'}
          </span>
          {metricName === 'query_time' && <LatencyChart data={stats} />}
        </div>
      );
    },
  };
};
