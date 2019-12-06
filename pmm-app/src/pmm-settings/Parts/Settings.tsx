import { PluginTooltip, VerticalFormWrapper } from '../../react-plugins-deps/components/helpers/Helpers';
import { SelectField } from '../../react-plugins-deps/components/FieldsComponents/Select/Select';
import { ToggleField } from '../../react-plugins-deps/components/FieldsComponents/Toggle/Toggle';
import SettingsService from './SettingsService';
import React from 'react';
import { Collapse, Slider } from 'antd';
import PanelForm from '../../react-plugins-deps/components/helpers/PanelForm';
import './Settings.scss';
import { InputField } from '../../react-plugins-deps/components/FieldsComponents/Input/Input';
import { showErrorNotification, showSuccessNotification } from '../../react-plugins-deps/components/helpers/notification-manager';
import ButtonElement from '../../react-plugins-deps/components/FieldsComponents/Button/Button';
const { Panel } = Collapse;
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
      <VerticalFormWrapper
        label={'Metrics resolution'}
        tooltip={<PluginTooltip linkText={'Read more'} url={'#'} text={'This setting defines how frequently the data will be collected'} />}
        element={<Slider marks={marks} max={2} step={null} included={false} defaultValue={2} />}
      />
      <Collapse bordered={false} defaultActiveKey={['1']} onChange={callback} style={customCollapseStyle}>
        <Panel header="Advanced settings " key="1" style={customPanelStyle}>
          <VerticalFormWrapper
            label={'Data retention'}
            tooltip={<PluginTooltip linkText={'Read more'} url={'#'} text={'This is the value for how long data will be stored'} />}
            element={
              <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                <InputField name={'data-retention-count'} form={form} wrapperStyle={{ width: '60%' }} />
                <SelectField form={form} name={'data-retention'} options={dataRetentionOptions} defaultValue={'weeks'} style={{ width: '40%' }} />
              </div>
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
      <ButtonElement onClick={() => {}} loading={props.loading} text={'Apply changes'} />
    </>
  );
};

export default PanelForm({
  Element: SettingsPart,
  onSubmit: async (values, setLoading) => {
    console.log(values, '-----');
    setLoading(true);
    try {
      await SettingsService.setSettings(values);
      setLoading(false);
      showSuccessNotification({ message: 'Settings updated!' });
    } catch (e) {
      setLoading(false);
      showErrorNotification({ message: e.message });
    }
  },
  validate: () => {},
});
