import { PluginTooltip, VerticalFormWrapper } from '../../react-plugins-deps/components/helpers/Helpers';
import { SelectField } from '../../react-plugins-deps/components/FieldsComponents/Select';
import { ToggleField } from '../../react-plugins-deps/components/FieldsComponents/Toggle';
import React from 'react';
import { Collapse, Slider } from 'antd';
const { Panel } = Collapse;
import PanelForm from '../../react-plugins-deps/components/helpers/PanelForm';
const dataRetentionOptions = [
  { value: 'weeks', label: 'Weeks' },
  { value: 'days', label: 'Days' },
  { value: 'hours', label: 'Hours' },
  { value: 'minutes', label: 'Minutes' },
];

const marks = {
  0: 'Low',
  1: 'Medium',
  2: 'High',
};

function callback(key) {
  console.log(key);
}

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

const SettingsPart = props => {
  const { form } = props;
  return (
    <>
      {' '}
      <VerticalFormWrapper
        label={'Metrics resolution'}
        tooltip={<PluginTooltip linkText={'Read more'} url={'#'} text={'This setting defines how frequently the data will be collected'} />}
        element={<Slider marks={marks} max={2} step={null} included={false} defaultValue={2} />}
      />
      <Collapse bordered={false} defaultActiveKey={['1']} onChange={callback} style={customCollapseStyle}>
        <Panel header="Advanced settings" key="1" style={customPanelStyle}>
          <VerticalFormWrapper
            label={'Data retention'}
            tooltip={<PluginTooltip linkText={'Read more'} url={'#'} text={'This is the value for how long data will be stored'} />}
            element={
              <>
                <input placeholder="Basic usage" className="input-field input-field--dark" style={{ width: '60%', height: '32px' }} />
                <SelectField options={dataRetentionOptions} defaultValue={'weeks'} />
              </>
            }
          />
          <VerticalFormWrapper
            label={'Call home'}
            tooltip={
              <PluginTooltip linkText={'Read more'} url={'#'} text={'Option to send usage data back to Percona to let us make product better'} />
            }
            element={<ToggleField form={form} name={'call_home'} />}
          />
          <VerticalFormWrapper
            label={'Check for updates'}
            tooltip={<PluginTooltip linkText={'Read more'} url={'#'} text={'Option to check new versions and ability to update PMM from UI'} />}
            element={<ToggleField form={form} name={'check_for_updates'} />}
          />
        </Panel>
      </Collapse>
      <button type="submit" className="button button--dark" id="addInstance" style={{ color: 'white' }}>
        Apply changes
      </button>
    </>
  );
};

export default PanelForm({ Element: SettingsPart });
