// import { METRIC_CATALOGUE } from '../data/metric-catalogue';
import AddColumn from '../AddColumn';
import React from 'react';
import PolygonChart from '../../../../../react-plugins-deps/components/PolygonChart/PolygonChart';
import LatencyChart from '../../../../../react-plugins-deps/components/LatencyChart/LatencyChart';

import './OverviewTable.scss';
import { Humanize } from '../../../../../react-plugins-deps/components/helpers/Humanize';
import { METRIC_CATALOGUE } from '../../metric-catalogue';

export const getColumnName = (metricName, columnIndex, totalValues) => {
  const humanize = new Humanize();
  let metric = METRIC_CATALOGUE[metricName];
  return {
    sorter: () => {},
    title: () => <AddColumn placeholder={metricName} currentMetric={metric} />,
    render: (text, item) => {
      // TODO: crash after second change of same column
      const stats = item.metrics[metricName].stats;
      return (
        <div className={'overview-content-column'}>
          {columnIndex === 0 && <PolygonChart width={150} data={item.sparkline} />}
          <span className="per-unit" style={{ marginRight: '10px' }}></span>
          <span className="summarize" style={{ marginRight: '10px' }}>
            {humanize.transform(stats.qps || stats.sum_per_sec, 'number')}
          </span>
          <span className="per-unit" style={{ marginRight: '10px' }}>
            {stats.sum && humanize.transform(stats.sum, metric.pipeTypes.sumPipe)}
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
