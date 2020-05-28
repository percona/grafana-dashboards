import * as React from 'react';
import { useEffect, useState } from 'react';
import { Collapse, Spin, Table } from 'antd';
import { processClassicExplain } from './Explain.tools';
import { Styling } from './Explain.styles';
import { ReactJSON } from '../../../../../../react-plugins-deps/components/Elements/ReactJSON/ReactJSON';
import { DATABASE } from '../Details.constants';

const { Panel } = Collapse;

const Explain = ({ classicExplain, jsonExplain, databaseType }) => {
  const [data, setData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    setData(processClassicExplain(classicExplain.value));
  }, [classicExplain]);

  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={['1', '2']} className={Styling.collapse}>
        {databaseType !== DATABASE.mongodb ? (
          <Panel header="Classic" key="1" className={Styling.panel}>
            <Spin spinning={classicExplain.loading}>
              {classicExplain.error ? <pre>{classicExplain.error}</pre> : null}
              {!classicExplain.error && !classicExplain.loading ? (
                data.rows.length ? (
                  <Table
                    dataSource={data.rows}
                    columns={data.columns}
                    pagination={false}
                    size="small"
                    bordered
                  />
                ) : (
                  <pre>No classic explains found</pre>
                )
              ) : null}
            </Spin>
          </Panel>
        ) : null}
        <Panel header="JSON" key="2" className={Styling.panel}>
          <Spin spinning={jsonExplain.loading}>
            {jsonExplain.error ? <pre>{jsonExplain.error}</pre> : null}
            {!jsonExplain.error && !jsonExplain.loading && jsonExplain.value ? (
              <ReactJSON json={JSON.parse(jsonExplain.value)} />
            ) : null}
            {!jsonExplain.error && !jsonExplain.loading && !jsonExplain.value ? (
              <pre>No JSON explains found</pre>
            ) : null}
          </Spin>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Explain;
