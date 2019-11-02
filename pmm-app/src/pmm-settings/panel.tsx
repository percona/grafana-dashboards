import React from 'react';
import { Collapse, Switch, Divider, Button, Input, Tooltip, Icon } from 'antd';
import { Slider } from 'antd';
import { Select } from 'antd';

const { Option } = Select;
import 'antd/dist/antd.css';
import '../react-plugins-deps/styles.scss';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;

const marks = {
  0: 'Low',
  1: 'Medium',
  2: 'High',
};


const customPanelStyle = {
  background: 'rgb(51, 51, 51)',
  // borderRadius: 4,
  marginBottom: 10,
  border: 1,
  borderColor: 'white'
  // overflow: 'hidden',
  color: 'white',
  textColor: 'white'
};

const customCollapseStyle = {
  background: 'transparent',
  // borderRadius: 4,
  marginBottom: 10,
  border: 1,
  borderColor: 'black',
  color: 'white',
  textColor: 'white'
};

const textStyle = {
  color: 'white',
};

const SimplePanel = () => {
  return (
    <div className={'app-theme-dark'}>
      <Collapse bordered={false} defaultActiveKey={['1']} onChange={callback} style={customCollapseStyle}>
        <Panel header="General" key="1" style={customPanelStyle}>
          <p style={textStyle}>
            Metrics resolution: <Slider marks={marks} max={2} step={null} defaultValue={2} />
          </p>
          <Tooltip placement="topLeft" title={<>This setting defines how frequently the data will be collected. <a
              href="link-to-doc">Read more.</a></>} style={{ background: 'deepskyblue' }}>
            <Icon type="question-circle" style={{ marginLeft: '5px' }} />
          </Tooltip>
        </Panel>
        <Panel header="Advanced settings" key="2" style={customPanelStyle}>
          <p style={textStyle}>
            Data retention:
            <Input placeholder="Basic usage" style={{ width: 120 }} />
            <Select defaultValue="days" style={{ width: 120 }} loading>
              <Option value="weeks">Weeks</Option>
              <Option value="days">Days</Option>
              <Option value="hours">Hours</Option>
              <Option value="minutes">Minutes</Option>
            </Select>
          </p>
          <p style={textStyle}>
            {' '}
            Call home: <Switch defaultChecked onChange={() => {}} />
          </p>
          <p style={textStyle}>
            {' '}
            Check for updates: <Switch defaultChecked onChange={() => {}} />{' '}
            <Tooltip placement="topLeft" title={'Some text to copy'} style={{ backgroundColor: 'deepskyblue' }}>
              <Icon type="question-circle" style={{ marginLeft: '5px' }} />
            </Tooltip>
          </p>
          <Divider></Divider>
          <p style={textStyle}>
            {' '}
            Orchestrator: <Switch defaultChecked onChange={() => {}} />
          </p>
          <p style={textStyle}> Orchestrator user:</p>
          <p style={textStyle}> Orchestrator password:</p>
        </Panel>
        <Panel header="SSH Key Details" key="3" style={customPanelStyle}>
          <p style={textStyle}>
            SSH key: <Input placeholder="Enter ssh key" style={{ width: 240 }} />
          </p>
        </Panel>
        <Panel header="Diagnostics" key="4" style={customPanelStyle}>
          <p style={textStyle}>Access to logs</p>
        </Panel>
      </Collapse>
      <Button type="primary">Apply changes</Button>
    </div>
  );
};

export default SimplePanel;
