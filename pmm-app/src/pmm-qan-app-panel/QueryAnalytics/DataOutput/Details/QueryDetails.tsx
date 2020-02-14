import React, { useContext } from 'react';
import { Divider, Tabs } from 'antd';
import './QueryDetails.scss';
import Fingerprint from './Fingerprint';
import Explain from './Explain/Explain.container';
import Example from './Example/Example';
import Metrics from './Metrics/Metrics';
import TableCreate from './Table/Table';
import { StateContext } from '../../StateContext';

const { TabPane } = Tabs;

const HARDCODED_FINGERPRINT = 'COLLSTATS sbtest3 clusterTime,collStats,hash,id,keyId,lsid,mode,scale,signature';
const HARDCODED_CONTROL_SUM = '4675a0d6d2e18bdce08b7c7aa83f88ff';
const QueryDetails = () => {
  const {
    state: { queryId, groupBy, from, to },
  } = useContext(StateContext);

  if (!queryId) {
    return null;
  }

  const MetricsProps = {
    labels: [],
    tables: [],
    queryId,
    groupBy,
    from,
    to,
  };

  return (
    <div className={'query-analytics-details-grid'} id={'query-analytics-details'}>
      <Fingerprint query={HARDCODED_FINGERPRINT} controlSum={HARDCODED_CONTROL_SUM} />
      <div className="details-tabs">
        <Divider />
        <Tabs defaultActiveKey="1" onChange={() => {}} tabPosition={'left'}>
          <TabPane tab="Details" key="1">
            <div className="details-table">
              <div className="details-table-content">
                <Metrics {...MetricsProps} />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Examples" key="2">
            <Example {...MetricsProps} />
          </TabPane>
          <TabPane tab="Explain" key="3">
            <Explain {...MetricsProps} />
          </TabPane>
          <TabPane tab="Tables" key="4">
            <TableCreate />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default QueryDetails;
