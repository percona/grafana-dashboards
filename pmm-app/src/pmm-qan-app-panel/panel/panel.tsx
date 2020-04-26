import React, { useEffect } from 'react';
import '../panel.scss';
import '../../react-plugins-deps/styles.scss';
import '../../react-plugins-deps/style.less';
import { UrlParametersProvider } from './panel.provider';

import FiltersContainer from '../components/Filters/Filters';
import QueryAnalyticsOutputContainer from '../components/QueryAnalyticsOutputContainer';
import Styling from '../../react-plugins-deps/helpers/styling';

const QueryAnalyticsPanel = props => {
  useEffect(() => Styling.addPluginPanelClass(), []);
  return (
    <UrlParametersProvider grafanaProps={props}>
      <div className="query-analytics-grid" id="antd">
        <div className="overview-filters" id="query-analytics-filters">
          <FiltersContainer />
        </div>
        <div id="query-analytics-data">
          <QueryAnalyticsOutputContainer />
        </div>
      </div>
    </UrlParametersProvider>
  );
};

export default QueryAnalyticsPanel;
