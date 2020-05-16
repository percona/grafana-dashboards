import * as React from 'react';
import { useEffect, useState } from 'react';
import { Collapse, Spin, Table } from 'antd';
import { processClassicExplain } from './Explain.tools';
import { Styling } from './Explain.styles';
import { ReactJSON } from '../../../../../../react-plugins-deps/components/Elements/ReactJSON/ReactJSON';

const { Panel } = Collapse;

const Explain = ({ classicExplain, jsonExplain }) => {
  const [data, setData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    setData(processClassicExplain(classicExplain.value));
  }, [classicExplain]);

  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={['1', '2']} className={Styling.collapse}>
        <Panel header="Classic" key="1" className={Styling.panel}>
          <Spin spinning={classicExplain.loading}>
            {classicExplain.error ? (
              <pre>{classicExplain.error}</pre>
            ) : data.rows.length ? (
              <Table dataSource={data.rows} columns={data.columns} pagination={false} size="small" bordered />
            ) : (
              <pre>No classic explains found</pre>
            )}
          </Spin>
        </Panel>
        <Panel header="JSON" key="2" className={Styling.panel}>
          <Spin spinning={jsonExplain.loading}>
            {jsonExplain.error ? (
              <pre>{jsonExplain.error}</pre>
            ) : jsonExplain.value ? (
              <ReactJSON json={JSON.parse(jsonExplain.value)} />
            ) : (
              <pre>No JSON explains found</pre>
            )}
          </Spin>
        </Panel>
      </Collapse>
    </div>
    // <Spin spinning={false}>
    //   {!classicExplain && jsonExplain ? (
    //     <pre>Cannot display query explain without query explain at this time.</pre>
    //   ) : (
    //
    //   )}
    // </Spin>
  );
};

export default Explain;
