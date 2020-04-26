import React, { useContext, useEffect, useState } from 'react';
import { Divider, Tabs } from 'antd';
import './Details.scss';
import Fingerprint from './Fingerprint/Fingerprint';
import Explain from './Explain/Explain.container';
import Example from './Example/Example';
import Metrics from './Metrics/Metrics';
import { PanelProvider } from '../../panel/panel.provider';
import Tooltip from 'antd/es/tooltip';
import TableCreateContainer from './Table/TableContainer';
import { useDatabaseType } from './Details.hooks';
import { DATABASE, TabKeys } from './Details.constants';

const { TabPane } = Tabs;

const Details = () => {
  const {
    panelState: { queryId, groupBy, fingerprint, controlSum },
  } = useContext(PanelProvider);
  const databaseType = useDatabaseType();
  const [activeTab, setActiveTab] = useState(TabKeys.Details);

  useEffect(() => setActiveTab(TabKeys.Details), [queryId]);

  return (
    <div className="query-analytics-details-grid" id="query-analytics-details">
      <Fingerprint query={fingerprint} controlSum={controlSum} groupBy={groupBy} />
      <div className="details-tabs">
        <Divider />
        <Tabs activeKey={activeTab} onChange={setActiveTab} tabPosition="top" destroyInactiveTabPane={true}>
          <TabPane tab={<span>Details</span>} key={TabKeys.Details}>
            <Metrics />
          </TabPane>
          <TabPane tab={<span>Examples</span>} key={TabKeys.Examples} disabled={queryId === 'TOTAL'}>
            <Example />
          </TabPane>
          <TabPane
            tab={
              <Tooltip title="Available for MySQL only" placement="leftTop">
                Explain
              </Tooltip>
            }
            key={TabKeys.Explain}
            disabled={databaseType === DATABASE.postgresql || queryId === 'TOTAL'}
          >
            <Explain />
          </TabPane>
          <TabPane tab={<span>Tables</span>} key={TabKeys.Tables} disabled={queryId === 'TOTAL'}>
            <TableCreateContainer />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Details;
