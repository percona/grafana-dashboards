// import { METRIC_CATALOGUE } from '../data/metric-catalogue';
import AddColumn from '../AddColumn';
import React from 'react';
// import PolygonChart from '../../../../react-plugins-deps/components/PolygonChart/PolygonChart';
// import LatencyChart from '../../../../react-plugins-deps/components/LatencyChart/LatencyChart';

import './OverviewTable.scss';

export const getColumnName = (metricName, columnIndex, totalValues) => {
  // let metric = METRIC_CATALOGUE[metricName];
  return {
    sorter: () => {},
    title: () => <AddColumn placeholder={metricName} />,
    render: (text, item) => {
      const stats = item.metrics[metricName].stats;
      return (
        <div className={'overview-content-column'}>
          {/*{columnIndex === 0 && <PolygonChart data={item.sparkline} />}*/}
          <span className="per-unit" style={{ marginRight: '10px' }}></span>
          <span className="summarize" style={{ marginRight: '10px' }}>
            {(stats.qps || stats.sum_per_sec).toFixed(2)}
          </span>
          <span className="total-percentage" style={{ marginRight: '10px' }}>
            {((stats.sum_per_sec / totalValues.metrics[metricName].stats.sum_per_sec) * 100).toFixed(2) + '%'}
          </span>
          {/*{metricName === 'query_time' && <LatencyChart data={stats} />}*/}
        </div>
      );
    },
  };
};
