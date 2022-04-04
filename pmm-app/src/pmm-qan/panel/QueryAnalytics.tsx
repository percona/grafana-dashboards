import React, {
  FC, useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import SplitPane from 'react-split-pane';
import { Button, useTheme } from '@grafana/ui';
import { cx } from '@emotion/css';
import { showSuccessNotification, showWarningNotification } from 'shared/components/helpers';
import { QueryAnalyticsProvider, UrlParametersProvider } from './provider/provider';
import {
  Details, Filters, ManageColumns, Overview,
} from './components';
import 'shared/styles.scss';
import 'shared/style.less';
import './qan.scss';
import { getStyles } from './QueryAnalytics.styles';
import { Messages } from './QueryAnalytics.messages';
import { buildShareLink, toUnixTimestamp } from './QueryAnalytics.tools';

const QueryAnalyticsPanel: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

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
    <div className="query-analytics-grid" id="antd" ref={queryAnalyticsWrapper}>
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
              <div className={styles.detailsWrapper}>{querySelected ? <Details /> : null}</div>
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
