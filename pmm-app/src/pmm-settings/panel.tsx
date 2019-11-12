import React, { ReactElement } from 'react';
import { Col, Collapse, Divider, Icon, Input, Row, Select, Slider, Tooltip } from 'antd';
import { useForm } from 'react-final-form-hooks';
import 'antd/dist/antd.css';
import '../react-plugins-deps/styles.scss';
import './panel.scss';
import { Form as FormFinal } from 'react-final-form';
import { ToggleField } from '../react-plugins-deps/components/FieldsComponents/Toggle';
import { TextAreaField } from '../react-plugins-deps/components/FieldsComponents/TextArea';
import { SelectField } from '../react-plugins-deps/components/FieldsComponents/Select';

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

const VerticalFormWrapper = props => (
  <Row style={{ color: 'white', marginBottom: '10px' }} align={'middle'}>
    <Col span={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
      <span>{props.label}</span>
    </Col>
    <Col span={8}>{props.element}</Col>
    <Col span={1}>{props.tooltip}</Col>
  </Row>
);

const SettingsTooltip = ({ url, linkText, text }) => {
  return (
    <Tooltip
      placement="topLeft"
      title={
        <>
          {text} <a href={url || ''}>{linkText || 'Read more'}</a>
        </>
      }
      style={{ background: 'deepskyblue' }}
    >
      <Icon type="question-circle" style={{ marginLeft: '5px' }} />
    </Tooltip>
  );
};

const ConfigurationOfSSH = props => {
  return (
    <>
      <VerticalFormWrapper
        label={'SSH key'}
        tooltip={<SettingsTooltip text={'Public SSH key to let you login into the server using SSH.'} />}
        element={
          <textarea
            rows={5}
            className="input-field input-field--textarea input-field--dark"
            placeholder="Enter ssh key"
            style={{ width: '100%' }}
          ></textarea>
        }
      />{' '}
      <button type="submit" className="button button--dark" id="addInstance" style={{ color: 'white' }}>
        Apply SSH key
      </button>
    </>
  );
};

const LogsDownloader = props => {
  return (
    <Row style={{ color: 'white', marginBottom: '10px' }} align={'middle'}>
      <Col span={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
        <span>Access to logs</span>
      </Col>
      <Col span={2}></Col>
    </Row>
  );
};

const dataRetentionOptions = [
  { value: 'weeks', label: 'Weeks' },
  { value: 'days', label: 'Days' },
  { value: 'hours', label: 'Hours' },
  { value: 'minutes', label: 'Minutes' },
];

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
          // @ts-ignore
          return (
            <form>
              <Collapse bordered={false} defaultActiveKey={['1']} onChange={callback} style={customCollapseStyle}>
                <Panel header="Settings" key="1" style={customPanelStyle}>
                  <VerticalFormWrapper
                    label={'Metrics resolution'}
                    tooltip={<SettingsTooltip text={'This setting defines how frequently the data will be collected'} />}
                    element={<Slider marks={marks} max={2} step={null} included={false} defaultValue={2} />}
                  />
                  <Collapse bordered={false} defaultActiveKey={['1']} onChange={callback} style={customCollapseStyle}>
                    <Panel header="Advanced settings" key="1" style={customPanelStyle}>
                      <VerticalFormWrapper
                        label={'Data retention'}
                        tooltip={<SettingsTooltip text={'This is the value for how long data will be stored'} />}
                        element={
                          <>
                            <input
                              type="text"
                              placeholder="Basic usage"
                              className="input-field input-field--dark"
                              style={{ width: '60%', height: '32px' }}
                            />
                            <SelectField options={dataRetentionOptions} defaultValue={'weeks'} />
                          </>
                        }
                      />
                      <VerticalFormWrapper
                        label={'Call home'}
                        tooltip={<SettingsTooltip text={'Option to send usage data back to Percona to let us make product better'} />}
                        element={<ToggleField form={form} name={'call_home'} />}
                      />
                      <VerticalFormWrapper
                        label={'Check for updates'}
                        tooltip={<SettingsTooltip text={'Option to check new versions and ability to update PMM from UI'} />}
                        element={<ToggleField form={form} name={'check_for_updates'} />}
                      />
                    </Panel>
                  </Collapse>
                  <button type="submit" className="button button--dark" id="addInstance" style={{ color: 'white' }}>
                    Apply changes
                  </button>
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
    </div>
  );
};

export default SettingsPanel;
