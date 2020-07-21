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
import { Databases, TabKeys } from './Details.constants';
import { styles } from './Details.styles';
import { useMetricsDetails } from './Metrics/Metrics.hooks';

const { TabPane } = Tabs;

export const DetailsSection: FC = () => {
  const {
    contextActions: { closeDetails, setActiveTab, setLoadingDetails },
    panelState: {
      queryId, groupBy, fingerprint, totals, openDetailsTab
    },
  } = useContext(QueryAnalyticsProvider);

  const [loading, examples, databaseType] = useDetailsState();
  const [metrics, metricsLoading] = useMetricsDetails();

  const [activeTab, changeActiveTab] = useState(TabKeys[openDetailsTab]);
  const showTablesTab = databaseType !== Databases.mongodb && groupBy === 'queryid' && !totals;
  const showExplainTab = databaseType !== Databases.postgresql && groupBy === 'queryid' && !totals;
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

  useEffect(() => setLoadingDetails(loading || metricsLoading), [loading, metricsLoading]);

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
              <Example
                fingerprint={fingerprint}
                databaseType={databaseType}
                examples={examples}
                loading={loading || metricsLoading}
              />
            </TabPane>
          ) : null}
          {showExplainTab ? (
            <TabPane tab={<span>Explain</span>} key={TabKeys.explain} disabled={totals}>
              <Explain
                examples={examples}
                databaseType={databaseType}
              />
            </TabPane>
          ) : null}
          {showTablesTab ? (
            <TabPane tab={<span>Tables</span>} key={TabKeys.tables} disabled={totals}>
              <TableCreateContainer
                databaseType={databaseType}
                examples={examples}
                // tables={tables}
                loading={loading}
              />
            </TabPane>
          ) : null}
        </Tabs>
      </div>
    </div>
  );
};
