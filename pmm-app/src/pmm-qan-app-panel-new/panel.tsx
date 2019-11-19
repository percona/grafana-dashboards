import React from 'react';
// import '../react-plugins-deps/antd.withoutglobal.css';
import '../react-plugins-deps/styles.scss';
import './panel.scss';
import { UrlParametersProvider } from './QueryAnalytics/StateContext';
import QueryAnalytics from './QueryAnalytics/QueryAnalytics';

const SettingsPanel = () => {
  return (
    <UrlParametersProvider>
      <QueryAnalytics />
    </UrlParametersProvider>
  );
};

export default SettingsPanel;
