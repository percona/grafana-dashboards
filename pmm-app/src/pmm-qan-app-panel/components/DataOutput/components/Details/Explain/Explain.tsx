import React, { useEffect, useState } from 'react';
import { Collapse, Table } from 'antd';
import { ReactJSON } from '../../../../../../react-plugins-deps/components/Elements/ReactJSON/ReactJSON';
import { Styling } from './Explain.styles';
import { processClassicExplain } from '../Details.tools';

const { Panel } = Collapse;

const Explain = ({ json, classic }) => {
  const [data, setData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    if (!classic) {
      return;
    }
    setData(processClassicExplain(classic));
  }, [classic]);

  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={['1', '2']} className={Styling.collapse}>
        {classic ? (
          <Panel header="Classic" key="1" className={Styling.panel}>
            <Table dataSource={data.rows} columns={data.columns} pagination={false} size="small" bordered />
          </Panel>
        ) : null}
        {json ? (
          <Panel header="JSON" key="2" className={Styling.panel}>
            <ReactJSON json={JSON.parse(json)} />
          </Panel>
        ) : null}
        {!data.rows.length && !json ? <p>No explains found</p> : null}
      </Collapse>
    </div>
  );
};

export default Explain;
