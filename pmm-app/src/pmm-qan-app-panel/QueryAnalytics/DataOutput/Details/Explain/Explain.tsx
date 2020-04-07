import React, { useEffect, useState } from 'react';
import { Collapse, Table } from 'antd';
import { ReactJSON } from '../../../../../react-plugins-deps/components/ReactJSON/ReactJSON';
import { css } from 'emotion';
const { Panel } = Collapse;

const Styling = {
  collapse: css`
    background: #1f1d1d !important;
    margin-bottom: 10 !important;
    border: 1 !important;
    border-color: white !important;
    color: white !important;
    text-color: white !important;
  `,
  panel: css`
    background: transparent !important;
    margin-bottom: 10 !important;
    border: 1 !important;
    border-color: black !important;
    color: white !important;
    text-color: white !important;
  `,
};

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
      .map((title, index) => ({ title: title, key: title, dataIndex: title }));

    const rowsList = data.map(item =>
      item
        .split('|')
        .map(e => e.trim())
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
        <Panel header="Classic" key="1" className={Styling.panel}>
          <Table
            dataSource={data.rows}
            columns={data.columns}
            pagination={false}
            size="small"
            bordered={true}
          />
        </Panel>
        <Panel header="JSON" key="2" className={Styling.panel}>
          <ReactJSON json={json} />
        </Panel>
      </Collapse>
    </div>
  );
};

export default Explain;
