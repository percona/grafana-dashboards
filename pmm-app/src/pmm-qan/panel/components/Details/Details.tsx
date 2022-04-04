import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import {
  Button, Tab, TabContent, TabsBar, useTheme,
} from '@grafana/ui';
import { cx } from '@emotion/css';
import { Scrollbar } from 'shared/components/Elements/Scrollbar/Scrollbar';
import { Databases } from 'shared/core';
import Explain from './Explain/Explain';
import Example from './Example/Example';
import Metrics from './Metrics/Metrics';
import TableCreateContainer from './Table/TableContainer';
import { useDetails } from './Details.hooks';
import { TabKeys } from './Details.constants';
import { useMetricsDetails } from './Metrics/hooks/useMetricDetails';
import { Messages } from './Details.messages';
import { getStyles } from './Details.styles';
import { Plan } from './Plan/Plan';

export const DetailsSection: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const {
    contextActions: { closeDetails, setActiveTab, setLoadingDetails },
    panelState: {
      queryId, groupBy, totals, openDetailsTab, database,
    },
  } = useContext(QueryAnalyticsProvider);

  const [loading, examples, databaseType] = useDetails();
  const [metrics, textMetrics, metricsLoading] = useMetricsDetails();

  const [activeTab, changeActiveTab] = useState(TabKeys[openDetailsTab]);
  const showTablesTab = databaseType !== Databases.mongodb && groupBy === 'queryid' && !totals;
  const showExplainTab = databaseType !== Databases.postgresql && groupBy === 'queryid' && !totals;
  const showExamplesTab = groupBy === 'queryid' && !totals;
  const showPlanTab = databaseType === Databases.postgresql && groupBy === 'queryid' && !totals;

  useEffect(() => {
    if (openDetailsTab === TabKeys.examples && !showExamplesTab) {
      changeActiveTab(TabKeys.details);

      return;
    }

    if (openDetailsTab === TabKeys.tables && !showTablesTab) {
      changeActiveTab(TabKeys.details);

      return;
    }

    if (openDetailsTab === TabKeys.explain && !showExplainTab) {
      changeActiveTab(TabKeys.details);

      return;
    }

    changeActiveTab(TabKeys[openDetailsTab]);
  }, [queryId, openDetailsTab, showTablesTab, showExplainTab, showExamplesTab]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLoadingDetails(loading || metricsLoading), [loading, metricsLoading]);

  const tabs = [
    {
      label: Messages.tabs.details.tab,
      key: TabKeys.details,
      show: true,
      component: (
        <Metrics
          databaseType={databaseType}
          groupBy={groupBy}
          totals={totals}
          metrics={metrics}
          textMetrics={textMetrics}
          loading={metricsLoading}
        />
      ),
    },
    {
      label: Messages.tabs.examples.tab,
      key: TabKeys.examples,
      show: showExamplesTab,
      component: (
        <Example databaseType={databaseType} examples={examples} loading={loading || metricsLoading} />
      ),
    },
    {
      label: Messages.tabs.explains.tab,
      key: TabKeys.explain,
      show: showExplainTab,
      component: <Explain examples={examples} databaseType={databaseType} />,
    },
    {
      label: Messages.tabs.tables.tab,
      key: TabKeys.tables,
      show: showTablesTab,
      component: <TableCreateContainer databaseType={databaseType} examples={examples} database={database} />,
    },
    {
      label: Messages.tabs.plan.tab,
      key: TabKeys.plan,
      show: showPlanTab,
      component: <Plan />,
    },
  ];

  return (
    <Scrollbar className={styles.scrollArea}>
      <div className={cx(styles.detailsGrid, 'query-analytics-details')} data-testid="query-analytics-details">
        <div className="details-tabs">
          <TabsBar>
            {tabs
              .filter(({ show }) => show)
              .map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  active={tab.key === activeTab}
                  onChangeTab={() => {
                    changeActiveTab(tab.key);
                    setActiveTab(tab.key);
                  }}
                />
              ))}
            <Button
              variant="secondary"
              size="sm"
              onClick={closeDetails}
              className={styles.closeDetailsButton}
            >
              {Messages.closeDetails}
            </Button>
          </TabsBar>
          <TabContent>{tabs.map((tab) => tab.key === activeTab && tab.component)}</TabContent>
        </div>
      </div>
    </Scrollbar>
  );
};
