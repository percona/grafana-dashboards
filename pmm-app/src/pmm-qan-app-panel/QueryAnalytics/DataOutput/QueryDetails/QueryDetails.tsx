import React from 'react';
// import Labels from './Labels/Labels';
import { Tabs } from 'antd';
import './QueryDetails.scss';
import Fingerprint from './Fingerprint';
import Explain from './Explain/Explain.container';
import Example from './Example/Example';
import Metrics from './Metrics/Metrics';
import TableCreate from './Table/Table';

const { TabPane } = Tabs;

const QueryDetails = props => {
  const MetricsProps = {
    filterBy: '1087289585964552152',
    groupBy: 'queryid',
    labels: [],
    periodStartFrom: '2019-12-16T12:09:16+00:00',
    periodStartTo: '2019-12-17T00:09:16+00:00',
    tables: [],
  };
  return (
    <div className={'query-analytics-details-grid'} id={'query-analytics-details'}>
      <Fingerprint
        query={'COLLSTATS sbtest3 clusterTime,collStats,hash,id,keyId,lsid,mode,scale,signature'}
        controlSum={'4675a0d6d2e18bdce08b7c7aa83f88ff'}
      />

      <div className="details-tabs">
        <Tabs defaultActiveKey="1" onChange={() => {}} tabPosition={'left'}>
          <TabPane tab="Details" key="1">
            <div className="details-table">
              <div className="details-table-content">
                <Metrics
                  filterBy={MetricsProps.filterBy}
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
              filterBy={MetricsProps.filterBy}
              groupBy={MetricsProps.groupBy}
              periodStartFrom={MetricsProps.periodStartFrom}
              periodStartTo={MetricsProps.periodStartTo}
              labels={MetricsProps.labels}
              tables={MetricsProps.tables}
            />
          </TabPane>
          <TabPane tab="Explain" key="3">
            <Explain
              filterBy={MetricsProps.filterBy}
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
