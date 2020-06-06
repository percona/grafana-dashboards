import React, { useEffect } from 'react';
import './panel.scss';
import 'react-plugins-deps/styles.scss';
import 'react-plugins-deps/style.less';
import styles from 'react-plugins-deps/components/helpers/styling';
import { UrlParametersProvider } from './panel.provider';

import FiltersContainer from './components/Filters/Filters';
import Layout from './components/Layout/Layout';

const QueryAnalyticsPanel = (props) => {
  useEffect(() => styles.addPluginPanelClass(), []);
  return (
    <UrlParametersProvider grafanaProps={props}>
      <div className="query-analytics-grid" id="antd">
        <div className="overview-filters" id="query-analytics-filters">
          <FiltersContainer />
        </div>
        <div id="query-analytics-data">
          <Layout />
        </div>
      </div>
    </UrlParametersProvider>
  );
};

export default QueryAnalyticsPanel;
