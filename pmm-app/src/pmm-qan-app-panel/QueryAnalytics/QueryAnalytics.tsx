import React, { useContext } from 'react';
import QueryDetails from './QueryDetails/QueryDetails';
import QueryAnalyticsOverview from './QueryAnalyticsOverview/QueryAnalyticsOverview';
import AutocompleteSearch from './AutocompleteSearch';
import './QueryAnalytics.scss';
import { StateContext } from './StateContext';

const QueryAnalytics = props => {
  const context = useContext(StateContext);
  return (
    <div className={'query-analytics-grid'} id={'antd'}>
      <AutocompleteSearch />
      <QueryAnalyticsOverview columns={context.columns} />
      {context.filterBy && <QueryDetails filterBy={context.filterBy} />}
    </div>
  );
};
export default QueryAnalytics;
