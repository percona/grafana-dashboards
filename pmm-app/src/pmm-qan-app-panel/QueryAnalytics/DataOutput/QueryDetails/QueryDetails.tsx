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

const QueryDetails = props => {
  const context = useContext(StateContext);

  if (!context.state.queryId) {
    return null
  }

  const MetricsProps = {
    filterBy: context.state.queryId,
    groupBy: context.state.groupBy,
    labels: [],
    periodStartFrom: context.state.from,
    periodStartTo: context.state.to,
    tables: [],
  };
  return (
    <div className={'query-analytics-details-grid'} id={'query-analytics-details'}>
      <Fingerprint
        query={'COLLSTATS sbtest3 clusterTime,collStats,hash,id,keyId,lsid,mode,scale,signature'}
        controlSum={'4675a0d6d2e18bdce08b7c7aa83f88ff'}
      />
      <div className="details-tabs">
        <Divider />
        <Tabs defaultActiveKey="1" onChange={() => {}} tabPosition={'left'}>
          <TabPane tab="Details" key="1">
            <div className="details-table">
              <div className="details-table-content">
                <Metrics
                  queryId={context.state.queryId}
                  groupBy={MetricsProps.groupBy}
                  periodStartFrom={MetricsProps.periodStartFrom}
                  periodStartTo={MetricsProps.periodStartTo}
                  labels={MetricsProps.labels}
                  tables={MetricsProps.tables}
                />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Examples" key="2">
            <Example
              queryId={context.state.queryId}
              groupBy={MetricsProps.groupBy}
              periodStartFrom={MetricsProps.periodStartFrom}
              periodStartTo={MetricsProps.periodStartTo}
              labels={MetricsProps.labels}
              tables={MetricsProps.tables}
            />
          </TabPane>
          <TabPane tab="Explain" key="3">
            <Explain
              queryId={context.state.queryId}
              groupBy={MetricsProps.groupBy}
              periodStartFrom={MetricsProps.periodStartFrom}
              periodStartTo={MetricsProps.periodStartTo}
              labels={MetricsProps.labels}
              tables={MetricsProps.tables}
            />
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
