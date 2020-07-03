import React, {
  FC, useContext, useEffect, useState
} from 'react';
import { Divider, Tabs, Button } from 'antd';
import './Details.scss';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import Explain from './Explain/Explain';
import Example from './Example/Example';
import Metrics from './Metrics/Metrics';
import TableCreateContainer from './Table/TableContainer';
import { useDetailsState } from './Details.hooks';
import { DATABASE, TabKeys } from './Details.constants';
import { DetailsContentProvider, DetailsProvider } from './Details.provider';
import { styles } from './Details.styles';
import { useMetricsDetails } from './Metrics/Metrics.hooks';

const { TabPane } = Tabs;
const actionResult = {
  error: '',
  loading: true,
  value: null,
};

const Details: FC = () => {
  const {
    contextActions: { closeDetails, setActiveTab },
    panelState: {
      queryId, groupBy, fingerprint, totals, openDetailsTab
    },
  } = useContext(QueryAnalyticsProvider);
  const {
    detailsState: {
      databaseType,
      classicExplain = actionResult,
      jsonExplain = actionResult,
      examples,
      tables,
    },
  } = useContext(DetailsProvider);

  useDetailsState();
  const [metrics, metricsLoading] = useMetricsDetails();

  const [activeTab, changeActiveTab] = useState(TabKeys[openDetailsTab]);
  const showTablesTab = databaseType !== DATABASE.mongodb && groupBy === 'queryid' && !totals;
  const showExplainTab = databaseType !== DATABASE.postgresql && groupBy === 'queryid' && !totals;
  const showExamplesTab = groupBy === 'queryid' && !totals;

  useEffect(() => {
    if (openDetailsTab === 'examples' && !showExamplesTab) {
      changeActiveTab(TabKeys.details);

      return;
    }

    if (openDetailsTab === 'tables' && !showTablesTab) {
      changeActiveTab(TabKeys.details);

      return;
    }

    if (openDetailsTab === 'explain' && !showExplainTab) {
      changeActiveTab(TabKeys.details);

      return;
    }

    changeActiveTab(TabKeys[openDetailsTab]);
  }, [queryId, openDetailsTab, showTablesTab, showExplainTab, showExamplesTab]);

  return (
    <div className="query-analytics-details-grid query-analytics-details" data-qa="query-analytics-details">
      <div className="details-tabs">
        <Divider className={styles.zeroMargin} />
        <Tabs
          activeKey={activeTab}
          onChange={(newTab) => {
            changeActiveTab(newTab);
            setActiveTab(newTab);
          }}
          tabPosition="top"
          destroyInactiveTabPane
          tabBarExtraContent={(
            <Button type="default" size="small" onClick={closeDetails}>
              Close
            </Button>
          )}
        >
          <TabPane tab={<span>Details</span>} key={TabKeys.details}>
            <Metrics databaseType={databaseType} totals={totals} metrics={metrics} loading={metricsLoading} />
          </TabPane>
          {showExamplesTab ? (
            <TabPane tab={<span>Examples</span>} key={TabKeys.examples}>
              <Example fingerprint={fingerprint} databaseType={databaseType} examples={examples} />
            </TabPane>
          ) : null}
          {showExplainTab ? (
            <TabPane tab={<span>Explain</span>} key={TabKeys.explain} disabled={totals}>
              <Explain
                classicExplain={classicExplain}
                jsonExplain={jsonExplain}
                databaseType={databaseType}
              />
            </TabPane>
          ) : null}
          {showTablesTab ? (
            <TabPane tab={<span>Tables</span>} key={TabKeys.tables} disabled={totals}>
              <TableCreateContainer databaseType={databaseType} examples={examples} tables={tables} />
            </TabPane>
          ) : null}
        </Tabs>
      </div>
    </div>
  );
};

export const DetailsSection = () => (
  <DetailsContentProvider>
    <Details />
  </DetailsContentProvider>
);
