import React, { useContext, useEffect, useState } from 'react';
import { Divider, Tabs } from 'antd';
import './Details.scss';
import { QueryAnalyticsProvider } from 'pmm-qan-app-panel/panel/panel.provider';
import Fingerprint from './Fingerprint/Fingerprint';
import Explain from './Explain/Explain';
import Example from './Example/Example';
import Metrics from './Metrics/Metrics';
import TableCreateContainer from './Table/TableContainer';
import { useDetailsState } from './Details.hooks';
import { DATABASE, TabKeys } from './Details.constants';
import { DetailsContentProvider, DetailsProvider } from './Details.provider';
import { styles } from './Details.styles';

const { TabPane } = Tabs;
const actionResult = {
  error: '',
  loading: true,
  value: null,
};

const Details = () => {
  const {
    contextActions: { closeDetails },
    panelState: {
      queryId, groupBy, fingerprint, controlSum, totals
    },
  } = useContext(QueryAnalyticsProvider);
  const {
    detailsState: {
      databaseType, classicExplain = actionResult, jsonExplain = actionResult, examples, tables
    },
  } = useContext(DetailsProvider);

  useDetailsState();
  const [activeTab, setActiveTab] = useState(TabKeys.Details);
  const showTablesTab = databaseType !== DATABASE.mongodb && groupBy === 'queryid' && !totals;
  // const showExplainTab = databaseType !== DATABASE.postgresql && groupBy === 'queryid' && !totals;
  const showExplainTab = true;
  const showExamplesTab = groupBy === 'queryid' && !totals;
  useEffect(() => setActiveTab(TabKeys.Details), [queryId]);

  return (
    <div className="query-analytics-details-grid" id="query-analytics-details">
      <Fingerprint
        totals={totals}
        query={fingerprint}
        controlSum={controlSum}
        queryId={queryId}
        groupBy={groupBy}
        closeDetails={closeDetails}
      />
      <div className="details-tabs">
        <Divider className={styles.zeroMargin} />
        <Tabs activeKey={activeTab} onChange={setActiveTab} tabPosition="top" destroyInactiveTabPane>
          <TabPane tab={<span>Details</span>} key={TabKeys.Details}>
            <Metrics databaseType={databaseType} totals={totals} />
          </TabPane>
          {showExamplesTab ? (
            <TabPane tab={<span>Examples</span>} key={TabKeys.Examples}>
              <Example fingerprint={fingerprint} databaseType={databaseType} examples={examples} />
            </TabPane>
          ) : null}
          {showExplainTab ? (
            <TabPane tab={<span>Explain</span>} key={TabKeys.Explain} disabled={totals}>
              <Explain
                classicExplain={classicExplain}
                jsonExplain={jsonExplain}
                databaseType={databaseType}
              />
            </TabPane>
          ) : null}
          {showTablesTab ? (
            <TabPane tab={<span>Tables</span>} key={TabKeys.Tables} disabled={totals}>
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
