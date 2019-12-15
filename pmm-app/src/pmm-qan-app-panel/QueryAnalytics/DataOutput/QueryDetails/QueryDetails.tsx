import React from 'react';
import { Tabs } from 'antd';
import './QueryDetails.scss';
import Fingerprint from './Fingerprint';
import Explain from './Explain/Explain';
import Example from './Example/Example';
import Metrics from './Metrics/Metrics';
import TableCreate from './Table/Table';
// import Labels from './Labels/Labels';
import { Divider } from 'antd';

const { TabPane } = Tabs;

const QueryDetails = props => {
  const MetricsProps = {
    filterBy: '80295d1d2720d4515b05d648e8caa82f',
    groupBy: 'queryid',
    labels: [],
    periodStartFrom: '2019-11-18T19:54:22+00:00',
    periodStartTo: '2019-11-19T07:54:22+00:00',
    tables: [],
  };
  return (
    <div className={'query-analytics-details-grid'} id={'query-analytics-details'}>
      <Fingerprint
        query={'COLLSTATS sbtest3 clusterTime,collStats,hash,id,keyId,lsid,mode,scale,signature'}
        controlSum={'4675a0d6d2e18bdce08b7c7aa83f88ff'}
      />
      <div className={'more-filters'}>
        <Divider></Divider>
        <h4>More filters for this query</h4>
        <Divider></Divider>
      </div>
      <div className="details-tabs">
        <Tabs defaultActiveKey="1" onChange={() => {}}>
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
              <div className="details-filters">
                {/*<Labels*/}
                {/*  filterBy={MetricsProps.filterBy}*/}
                {/*  groupBy={MetricsProps.groupBy}*/}
                {/*  periodStartFrom={MetricsProps.periodStartFrom}*/}
                {/*  periodStartTo={MetricsProps.periodStartTo}*/}
                {/*  labels={MetricsProps.labels}*/}
                {/*  tables={MetricsProps.tables}*/}
                {/*/>*/}
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
            <Explain />
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
