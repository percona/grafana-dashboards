import React, {ReactElement} from 'react';
import {Collapse, Icon, Input, Select, Slider, Tooltip} from 'antd';
import {useForm} from 'react-final-form-hooks';
import 'antd/dist/antd.css';
import '../react-plugins-deps/styles.scss';
import './panel.scss';
import {Form as FormFinal} from 'react-final-form';
import {ToggleField} from '../react-plugins-deps/components/FieldsComponents/Toggle';

const { Option } = Select;

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

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
  borderColor: 'white',
  // overflow: 'hidden',
  color: 'white',
  textColor: 'white',
};

const customCollapseStyle = {
  background: 'transparent',
  // borderRadius: 4,
  marginBottom: 10,
  border: 1,
  borderColor: 'black',
  color: 'white',
  textColor: 'white',
};

const textStyle = {
  color: 'white',
};

const getTooltip = content => {
  return (
    <Tooltip placement="topLeft" title={content} style={{ background: 'deepskyblue' }}>
      <Icon type="question-circle" style={{ marginLeft: '5px' }} />
    </Tooltip>
  );
};

const ConfigurationOfSSH = props => {
  return (
    <p style={textStyle}>
      SSH key: <Input placeholder="Enter ssh key" style={{ width: 240 }} />
      {getTooltip(
        <>
          Public SSH key to let you login into the server using SSH. <a href="link-to-doc">Read more.</a>
        </>
      )}
      <button type="submit" className="button button--dark" id="addInstance">
        Apply SSH key
      </button>
    </p>
  );
};

const LogsDownloader = props => {
  return (
    <p style={textStyle}>
      Access to logs
      {getTooltip(
        <>
          This Diagnostics data contains the most important logs and config files to simplify the problem detection process.
          <a href="link-to-doc">Read more.</a>
        </>
      )}
    </p>
  );
};

const SettingsPanel = () => {
  return (
    <div className={'app-theme-dark pmm-settings-panel'}>
      <FormFinal
        onSubmit={() => {}}
        validate={() => {
          return undefined;
        }}
        render={(): ReactElement => {
          const { form } = useForm({
            onSubmit: () => {},
            validate: () => {},
          });

          return (
            <form>
              <Collapse bordered={false} defaultActiveKey={['1']} onChange={callback} style={customCollapseStyle}>
                <Panel header="General" key="1" style={customPanelStyle}>
                  <p style={textStyle} style={{ width: '400px' }}>
                    Metrics resolution: <Slider marks={marks} max={2} step={null} included={false} defaultValue={2} />
                    {getTooltip(
                      <>
                        This setting defines how frequently the data will be collected. <a href="link-to-doc">Read more.</a>
                      </>
                    )}
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
                    {getTooltip(
                      <>
                        This is the value for how long data will be stored. <a href="link-to-doc">Read more.</a>
                      </>
                    )}
                  </p>
                  <p style={textStyle}>
                    Call home: <ToggleField form={form} name={'call_home'} />
                    {getTooltip(
                      <>
                        Option to send usage data back to Percona to let us make product better. <a href="link-to-doc">Read more.</a>
                      </>
                    )}
                  </p>
                  <p style={textStyle}>
                    Check for updates: <ToggleField form={form} name={'check_for_updates'} />
                    {getTooltip(
                      <>
                        Option to check new versions and ability to update PMM from UI. <a href="link-to-doc">Read more.</a>
                      </>
                    )}
                  </p>
                </Panel>
                <Panel header="SSH Key Details" key="3" style={customPanelStyle}>
                  <ConfigurationOfSSH />
                </Panel>
                <Panel header="Diagnostics" key="4" style={customPanelStyle}>
                  <LogsDownloader />
                </Panel>
              </Collapse>
            </form>
          );
        }}
      />
      <button type="submit" className="button button--dark" id="addInstance">
        Apply changes
      </button>
    </div>
  );
};

export default SettingsPanel;
