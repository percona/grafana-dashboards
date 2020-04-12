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

const QueryDetails = () => {
  const {
    panelState: { queryId, groupBy, from, to, fingerprint, controlSum },
  } = useContext(StateContext);
  const [databaseType, setDatabaseType] = useState('');

  const MetricsProps = {
    labels: [],
    tables: [],
    queryId: queryId || '',
    groupBy,
    from,
    to,
    databaseType,
  };

  useEffect(() => {
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
        <Tabs defaultActiveKey="1" onChange={() => {}} tabPosition="left">
          <TabPane tab={<span>Details</span>} key="1">
            <Metrics {...MetricsProps} />
          </TabPane>
          <TabPane tab={<span>Examples</span>} key="2">
            <Example {...MetricsProps} />
          </TabPane>
          <TabPane
            tab={
              <Tooltip title="Available for MySQL only" placement="leftTop">
                Explain
              </Tooltip>
            }
            key="3"
            disabled={databaseType === 'postgresql'}
          >
            <Explain {...MetricsProps} />
          </TabPane>
          <TabPane tab={<span>Tables</span>} key="4">
            <TableCreateContainer {...MetricsProps} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default QueryDetails;
