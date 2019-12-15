import React from 'react';
import './QueryAnalytics.scss';
import Filters from './Filters/Filters';
import DataOutput from './DataOutput/DataOutput';

const QueryAnalytics = props => {
  return (
    <div className={'query-analytics-grid'} id={'antd'}>
      <div className="overview-filters" id="query-analytics-filters">
        <Filters />
      </div>
      <div id="query-analytics-data">
        <DataOutput />
      </div>
    </div>
  );
};
export default QueryAnalytics;
