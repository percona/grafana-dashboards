import React from 'react';
import AddColumn from './AddColumn';
import './QueryAnalyticsOverview.scss';
import QueryAnalyticsFilters from './QueryAnalyticsFilters/QueryAnalyticsFilters';
import OverviewTable from './OverviewTable/OverviewTable';

const QueryAnalyticsOverview = props => {
  return (
    <div className={'query-analytics-overview-grid'} id={'query-analytics-overview'}>
      <div className={'add-column'}>
        <AddColumn />
      </div>
      <div className="overview-filters">
        <QueryAnalyticsFilters showPercentage={true} />
      </div>
      <div className="overview-table">
        <OverviewTable columns={props.columns} />
      </div>
    </div>
  );
};

export default QueryAnalyticsOverview;
