import React, { useContext, useEffect, useState } from 'react';
import { Divider, Tabs } from 'antd';
import './QueryDetails.scss';
import Fingerprint from './Fingerprint';
import Explain from './Explain/Explain.container';
import Example from './Example/Example';
import Metrics from './Metrics/Metrics';
import TableCreate from './Table/Table';
import { StateContext } from '../../StateContext';
import ExampleService from './Example/Example.service';
import Tooltip from 'antd/es/tooltip';

const { TabPane } = Tabs;

const HARDCODED_FINGERPRINT = 'COLLSTATS sbtest3 clusterTime,collStats,hash,id,keyId,lsid,mode,scale,signature';
const HARDCODED_CONTROL_SUM = '4675a0d6d2e18bdce08b7c7aa83f88ff';
const QueryDetails = () => {
  const {
    state: { queryId, groupBy, from, to },
  } = useContext(StateContext);
  const [databaseType, setDatabaseType] = useState('');
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
          <TabPane
            tab={
              <Tooltip title={'Available for MySQL'} placement={'leftTop'}>
                {'Explain'}
              </Tooltip>
            }
            key="3"
            disabled={databaseType === 'postgresql'}
          >
            <Explain {...MetricsProps} />
          </TabPane>
          <TabPane
            tab={
              <Tooltip title={'Available for MySQL'} placement={'leftTop'}>
                {'Tables'}
              </Tooltip>
            }
            key="4"
            disabled={databaseType === 'postgresql'}
          >
            <TableCreate {...MetricsProps} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default QueryDetails;
