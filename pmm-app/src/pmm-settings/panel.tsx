import React from 'react';
import { Collapse, Switch, Divider, Button, Input, Tooltip, Icon } from 'antd';
import { Slider } from 'antd';
import { Select } from 'antd';

const { Option } = Select;
import 'antd/dist/antd.css';

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
  // background: '#212124',
  // borderRadius: 4,
  // marginBottom: 24,
  // border: 1,
  // overflow: 'hidden',
  // color: 'white',
  // textColor: 'white'
};

const textStyle = {
  color: 'black',
};

const SimplePanel = () => {
  return (
    <>
      <Collapse bordered={false} defaultActiveKey={['1']} onChange={callback} style={customPanelStyle}>
        <Panel header="General" key="1">
          <p style={textStyle}>
            {' '}
            Metrics resolution: <Slider marks={marks} max={2} step={null} defaultValue={2} />
          </p>
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
      </Collapse>
      <Button type="primary">Apply changes</Button>
    </>
  );
};

export default SimplePanel;
