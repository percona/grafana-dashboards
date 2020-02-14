import React from 'react';
import { Collapse } from 'antd';
import { ReactJSON } from '../../../../../react-plugins-deps/components/ReactJSON/ReactJSON';
const { Panel } = Collapse;

const customPanelStyle = {
  background: '#1f1d1d',
  marginBottom: 10,
  border: 1,
  borderColor: 'white',
  color: 'white',
  textColor: 'white',
};

const customCollapseStyle = {
  background: 'transparent',
  marginBottom: 10,
  border: 1,
  borderColor: 'black',
  color: 'white',
  textColor: 'white',
};

const Explain = ({ json, classic }) => {
  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={['1', '2']} style={customCollapseStyle}>
        <Panel header="Classic" key="1" style={customPanelStyle}>
          {classic}
        </Panel>
        <Panel header="JSON" key="2" style={customPanelStyle}>
          <ReactJSON json={json} />
        </Panel>
      </Collapse>
    </div>
  );
};

export default Explain;
