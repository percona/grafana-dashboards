import React from 'react';
import './panel.scss';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
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
