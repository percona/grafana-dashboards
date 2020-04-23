import React, { useContext, useEffect, useState } from 'react';
import { Divider, Tabs } from 'antd';
import './QueryDetails.scss';
import Fingerprint from './Fingerprint';
import Explain from './Explain/Explain.container';
import Example from './Example/Example';
import Metrics from './Metrics/Metrics';
import { StateContext } from '../../StateContext';
import ExampleService from './Example/Example.service';
import Tooltip from 'antd/es/tooltip';
import TableCreateContainer from './Table/TableContainer';

const { TabPane } = Tabs;

const TabKeys = {
  Details: 'Details',
  Examples: 'Examples',
  Explain: 'Explain',
  Tables: 'Tables',
};

const QueryDetails = () => {
  const {
    panelState: { queryId, groupBy, from, to, fingerprint, controlSum, labels },
  } = useContext(StateContext);
  const [databaseType, setDatabaseType] = useState('');
  const [activeTab, setActiveTab] = useState(TabKeys.Details);
  const MetricsProps = {
    labels: labels,
    tables: [],
    queryId: queryId || '',
    groupBy,
    from,
    to,
    databaseType,
  };

  useEffect(() => {
    setActiveTab(TabKeys.Details);
    (async () => {
      try {
        const result = await ExampleService.getExample({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels: MetricsProps.labels,
          tables: MetricsProps.tables,
        });
        setDatabaseType(result['query_examples'][0].service_type);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, [queryId]);

  return (
    <div className="query-analytics-details-grid" id="query-analytics-details">
      <Fingerprint query={fingerprint} controlSum={controlSum} groupBy={groupBy} />
      <div className="details-tabs">
        <Divider />
        <Tabs activeKey={activeTab} onChange={setActiveTab} tabPosition="top">
          <TabPane tab={<span>Details</span>} key={TabKeys.Details}>
            <Metrics {...MetricsProps} />
          </TabPane>
          <TabPane tab={<span>Examples</span>} key={TabKeys.Examples}>
            <Example {...MetricsProps} />
          </TabPane>
          <TabPane
            tab={
              <Tooltip title="Available for MySQL only" placement="leftTop">
                Explain
              </Tooltip>
            }
            key={TabKeys.Explain}
            disabled={databaseType === 'postgresql'}
          >
            <Explain {...MetricsProps} />
          </TabPane>
          <TabPane tab={<span>Tables</span>} key={TabKeys.Tables}>
            <TableCreateContainer {...MetricsProps} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default QueryDetails;
