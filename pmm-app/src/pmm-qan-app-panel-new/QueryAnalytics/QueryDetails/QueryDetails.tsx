import React from 'react';
import {Tabs} from 'antd';
import './QueryDetails.scss';
import Fingerprint from './Fingerprint';
import Explain from './Explain/Explain';
import Example from './Example/Example';
import Metrics from './Metrics/Metrics';
import TableCreate from './Table/Table';
// import Labels from './Labels/Labels';

const { TabPane } = Tabs;

const QueryDetails = props => {
  const MetricsProps = {
    filterBy: 'f04c27d594ea4e37808d795f8c4646d8',
    groupBy: 'queryid',
    periodStartFrom: '2019-10-15T23:50:13+00:00',
    periodStartTo: '2019-10-16T11:50:13+00:00',
    labels: [],
    tables: [],
  };

  return (
    <div className={'query-analytics-details-grid'} id={'query-analytics-details'}>
      <Fingerprint
        query={'COLLSTATS sbtest3 clusterTime,collStats,hash,id,keyId,lsid,mode,scale,signature'}
        controlSum={'4675a0d6d2e18bdce08b7c7aa83f88ff'}
      />
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
