import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import SplitPane from 'react-split-pane';
import { Button, useTheme } from '@grafana/ui';
import type { GrafanaTheme } from '@grafana/data';
import { cx } from '@emotion/css';
import { showSuccessNotification, showWarningNotification } from 'shared/components/helpers';
import { ConfigProvider } from 'antd';
import { getAntdTheme } from 'shared/core/theme';
import { applyPmmCssVariables } from 'shared/components/helpers/getPmmTheme';
import { QueryAnalyticsProvider, UrlParametersProvider } from './provider/provider';
import {
  Details,
  Filters,
  ManageColumns,
  Overview,
} from './components';
import 'shared/styles.scss';
import 'shared/style.less';
import './qan.scss';
import { getStyles } from './QueryAnalytics.styles';
import { Messages } from './QueryAnalytics.messages';
import { buildShareLink, toUnixTimestamp } from './QueryAnalytics.tools';

// Panel now receives theme from root.
interface QueryAnalyticsPanelProps {
  grafanaTheme: GrafanaTheme;
}

const QueryAnalyticsPanel: FC<QueryAnalyticsPanelProps> = ({ grafanaTheme }) => {
  const styles = getStyles(grafanaTheme);

  const {
    panelState: { querySelected, from, to },
  } = useContext(QueryAnalyticsProvider);

  const queryAnalyticsWrapper = useRef<HTMLDivElement>(null);
  const [, setReload] = useState<object>({});

  const copyLinkToClipboard = useCallback(() => {
    const link = buildShareLink(toUnixTimestamp(from), toUnixTimestamp(to));

    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(link);
      showSuccessNotification({ message: Messages.copiedToClipboard });
    } else {
      const message = (
        <div>
          {Messages.clipboardNotAvailable}
          <span className={styles.link}>{link}</span>
        </div>
      );

      showWarningNotification({ message });
    }
  }, [from, to, styles]);

  useEffect(() => {
    setReload({});
  }, [querySelected]);

  return (
    // Force remount when theme changes to ensure Ant Design components (Table, Select, Checkbox)
    // pick up the new theme from ConfigProvider. Without this, components render with wrong colors
    // until page refresh (e.g., dark mode Table in light theme).
    <div
      key={grafanaTheme.type}
      className="query-analytics-grid"
      id="antd"
      ref={queryAnalyticsWrapper}
    >
      <div className="overview-filters">
        <Filters />
      </div>
      <div className="query-analytics-data">
        <div>
          <div className={cx(styles.overviewHeader, 'manage-columns')}>
            <Button
              onClick={copyLinkToClipboard}
              variant="secondary"
              icon="copy"
              title={Messages.copyLinkTooltip}
              data-testid="copy-link-button"
            >
              {Messages.copyLink}
            </Button>
            <ManageColumns onlyAdd />
          </div>
          <div className={styles.splitterWrapper}>
            {/* @ts-ignore */}
            <SplitPane
              key={querySelected ? 'split' : 'full'}
              split="horizontal"
              onDragFinished={() => setReload({})}
              className={styles.splitterWrapper}
              resizerStyle={{ display: querySelected ? '' : 'none' }}
              pane1Style={{
                minHeight: querySelected ? SPLIT_PANE_CONFIG.overview.minHeight : '100%',
                maxHeight: querySelected ? SPLIT_PANE_CONFIG.overview.maxHeight : '100%',
              }}
              pane2Style={{
                minHeight: querySelected ? SPLIT_PANE_CONFIG.details.minHeight : '0',
                maxHeight: querySelected ? SPLIT_PANE_CONFIG.details.maxHeight : '0',
                zIndex: SPLIT_PANE_CONFIG.details.zIndex,
              }}
            >
              <Overview />
              <div className={styles.detailsWrapper}>
                {querySelected ? <Details /> : null}
              </div>
            </SplitPane>
          </div>
        </div>
      </div>
    </div>
  );
};

const QueryAnalyticsRoot: FC<any> = (props) => {
  const grafanaTheme = useTheme();

  const antdTheme = useMemo(
    () => getAntdTheme(grafanaTheme),
    [grafanaTheme],
  );

  // Apply CSS variables for QAN theme (dropdowns, backgrounds, text colors)
  // useLayoutEffect runs synchronously before browser paint, ensuring styles are applied before render
  useLayoutEffect(() => {
    applyPmmCssVariables(grafanaTheme);
  }, [grafanaTheme, grafanaTheme.type]);

  return (
    <ConfigProvider theme={antdTheme}>
      <UrlParametersProvider {...props}>
        <QueryAnalyticsPanel grafanaTheme={grafanaTheme} />
      </UrlParametersProvider>
    </ConfigProvider>
  );
};

export default QueryAnalyticsRoot;
