import React, { useEffect } from 'react';
import './panel.scss';
import 'react-plugins-deps/styles.scss';
import 'react-plugins-deps/style.less';
import styles from 'react-plugins-deps/components/helpers/styling';
import { UrlParametersProvider } from './panel.provider';
import Layout from './components/Layout/Layout';

const QueryAnalyticsPanel = (props) => {
  useEffect(() => styles.addPluginPanelClass(), []);
  return (
    <UrlParametersProvider grafanaProps={props}>
      <Layout />
    </UrlParametersProvider>
  );
};

export default QueryAnalyticsPanel;
