import React, { useContext, useEffect, useState } from 'react';
import { Divider, Tabs } from 'antd';
import './Details.scss';
import Fingerprint from './Fingerprint/Fingerprint';
import Explain from './Explain/Explain.container';
import Example from './Example/Example';
import Metrics from './Metrics/Metrics';
import { PanelProvider } from '../../../../panel/panel.provider';
import TableCreateContainer from './Table/TableContainer';
import { useDetailsState } from './Details.hooks';
import { DATABASE, TabKeys } from './Details.constants';
import { DetailsContentProvider, DetailsProvider } from './Details.provider';

const { TabPane } = Tabs;

const Details = () => {
  const {
    contextActions: { closeDetails },
    panelState: { queryId, groupBy, fingerprint, controlSum },
  } = useContext(PanelProvider);
  const {
    detailsState: { databaseType },
  } = useContext(DetailsProvider);

  useDetailsState();
  const [activeTab, setActiveTab] = useState(TabKeys.Details);
  const showTablesTab = databaseType !== DATABASE.mongodb;
  const showExplainTab = databaseType !== DATABASE.postgresql;
  useEffect(() => setActiveTab(TabKeys.Details), [queryId]);

  return (
    <div className="query-analytics-details-grid" id="query-analytics-details">
      <Fingerprint
        query={fingerprint}
        controlSum={controlSum}
        groupBy={groupBy}
        closeDetails={closeDetails}
      />
      <div className="details-tabs">
        <Divider />
        <Tabs activeKey={activeTab} onChange={setActiveTab} tabPosition="top" destroyInactiveTabPane>
          <TabPane tab={<span>Details</span>} key={TabKeys.Details}>
            <Metrics />
          </TabPane>
          <TabPane tab={<span>Examples</span>} key={TabKeys.Examples} disabled={queryId === 'TOTAL'}>
            <Example />
          </TabPane>
          {showExplainTab ? (
            <TabPane tab={<span>Explain</span>} key={TabKeys.Explain} disabled={queryId === 'TOTAL'}>
              <Explain />
            </TabPane>
          ) : null}
          {showTablesTab ? (
            <TabPane tab={<span>Tables</span>} key={TabKeys.Tables} disabled={queryId === 'TOTAL'}>
              <TableCreateContainer />
            </TabPane>
          ) : null}
        </Tabs>
      </div>
    </div>
  );
};

export default () => {
  return (
    <DetailsContentProvider>
      <Details />
    </DetailsContentProvider>
  );
};
