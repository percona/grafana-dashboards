import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const jsonExplainExample = {
  query_block: {
    select_id: 1,
    table: {
      table_name: 't1',
      access_type: 'ALL',
      rows: 1000,
      filtered: 100,
      attached_condition: '(t1.col1 = 1)',
    },
  },
};
class Explain extends Component {
  render() {
    return (
      <div>
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="Classic" key="1">
            {123}
          </Panel>
          <Panel header="JSON" key="2">
            <ReactJson src={jsonExplainExample} />
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default Explain;
