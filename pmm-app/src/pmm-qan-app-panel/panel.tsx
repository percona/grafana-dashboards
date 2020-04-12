import React, { useEffect } from 'react';
import './panel.scss';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import { UrlParametersProvider } from './QueryAnalytics/StateContext';

import FiltersContainer from './QueryAnalytics/Filters/Filters';
import QueryAnalyticsContainer from './QueryAnalytics/DataOutput/QueryAnalyticsContainer';
import Styling from '../react-plugins-deps/components/helpers/styling';

const SettingsPanel = () => {
  useEffect(() => Styling.addPluginPanelClass(), []);
  return (
    <UrlParametersProvider>
      <div className="query-analytics-grid" id="antd">
        <div className="overview-filters" id="query-analytics-filters">
          <FiltersContainer />
        </div>
        <div id="query-analytics-data">
          <QueryAnalyticsContainer />
        </div>
      </div>
    </UrlParametersProvider>
  );
};

export default SettingsPanel;
