import React from 'react';
import ReactJson from 'react-json-view';
import {Collapse} from 'antd';

const { Panel } = Collapse;

const Explain = ({ json, classic }) => {
  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header="Classic" key="1">
          {classic}
        </Panel>
        <Panel header="JSON" key="2">
          <ReactJson src={json || {}} />
        </Panel>
      </Collapse>
    </div>
  );
};

export default Explain;
