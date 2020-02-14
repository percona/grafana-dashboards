import React from 'react';
import ReactJson from 'react-json-view';
import { Collapse } from 'antd';
const { Panel } = Collapse;

// TODO: remove stryling code duplicates
const THEME_JSON_VIEW = {
  base00: 'transparent',
  base01: 'transparent',
  base02: 'lightgray',
  base03: '#bfbfbf',
  base04: '#1890ff',
  base05: '#bfbfbf',
  base06: '#bfbfbf',
  base07: '#bfbfbf',
  base08: '#bfbfbf',
  base09: 'white',
  base0A: 'white',
  base0B: 'white',
  base0C: 'white',
  base0D: 'white',
  base0E: 'white',
  base0F: 'white',
};

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
          <ReactJson src={json || {}} theme={THEME_JSON_VIEW} />
        </Panel>
      </Collapse>
    </div>
  );
};

export default Explain;
