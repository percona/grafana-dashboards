import React, {
  FC, useContext, useEffect, useRef, useState
} from 'react';
import SplitPane from 'react-split-pane';
import { useTheme } from '@grafana/ui';
import { QueryAnalyticsProvider, UrlParametersProvider } from './provider/provider';
import {
  Details, Filters, ManageColumns, Overview
} from './components';
import 'shared/styles.scss';
import 'shared/style.less';
import './qan.scss';
import { getStyles } from './QueryAnalytics.styles';

const QueryAnalyticsPanel: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const {
    panelState: { querySelected },
  } = useContext(QueryAnalyticsProvider);
  // TODO: replace with something more elegant & fast
  const queryAnalyticsWrapper = useRef<HTMLDivElement>(null);
  const size = queryAnalyticsWrapper.current?.clientWidth;

  const [, setReload] = useState<object>({});

  useEffect(() => {
    setReload({});
  }, [querySelected]);

  return (
    <div className="query-analytics-grid" id="antd" ref={queryAnalyticsWrapper}>
      <div className="overview-filters">
        <Filters />
      </div>
      <div className="query-analytics-data">
        <div className={styles.getContainerWrapper(size)}>
          <div className={styles.overviewHeader}>
            <ManageColumns onlyAdd />
          </div>
          <div className={styles.splitterWrapper}>
            <SplitPane
              split="horizontal"
              onDragFinished={() => setReload({})}
              className={styles.splitterWrapper}
              resizerStyle={{ display: querySelected ? '' : 'none' }}
              pane1Style={{
                minHeight: querySelected ? '30%' : '100%',
                maxHeight: querySelected ? '60%' : '100%',
              }}
              pane2Style={{ minHeight: '20%', zIndex: 999 }}
            >
              <Overview />
              <div>{querySelected ? <Details /> : null}</div>
            </SplitPane>
          </div>
        </div>
      </div>
    </div>
  );
};

export default (props) => (
  <UrlParametersProvider {...props}>
    <QueryAnalyticsPanel />
  </UrlParametersProvider>
);
