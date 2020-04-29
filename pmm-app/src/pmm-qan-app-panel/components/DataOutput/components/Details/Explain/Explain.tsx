import React, { useEffect, useState } from 'react';
import { Collapse, Table } from 'antd';
import { ReactJSON } from '../../../../../../react-plugins-deps/components/Elements/ReactJSON/ReactJSON';
import { Styling } from './Explain.styles';

const { Panel } = Collapse;

const Explain = ({ json, classic }) => {
  const [data, setData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    if (!classic) {
      return;
    }

    const [header, ...data] = classic.split('\n');
    const headerList = header
      .split('|')
      .map(e => e.trim())
      .filter(Boolean)
      .map(title => ({ title: title, key: title, dataIndex: title }));

    const rowsList = data.map(item =>
      item
        .split('|')
        .map(e => e.trim())
        .filter(Boolean)
        .reduce((acc, item, index) => {
          acc[headerList[index].title] = item;
          return acc;
        }, {})
    );
    setData({ columns: headerList, rows: rowsList });
  }, [classic]);

  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={['1', '2']} className={Styling.collapse}>
        {data.rows.length ? (
          <Panel header="Classic" key="1" className={Styling.panel}>
            <Table dataSource={data.rows} columns={data.columns} pagination={false} size="small" bordered />
          </Panel>
        ) : null}
        {json ? (
          <Panel header="JSON" key="2" className={Styling.panel}>
            <ReactJSON json={json} />
          </Panel>
        ) : null}
        {!data.rows.length && !json ? <p>No explains found</p> : null}
      </Collapse>
    </div>
  );
};

export default Explain;
