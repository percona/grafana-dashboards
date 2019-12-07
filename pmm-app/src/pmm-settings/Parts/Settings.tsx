import { PluginTooltip, VerticalFormWrapper } from '../../react-plugins-deps/components/helpers/Helpers';
import { SelectField } from '../../react-plugins-deps/components/FieldsComponents/Select/Select';
import { ToggleField } from '../../react-plugins-deps/components/FieldsComponents/Toggle/Toggle';
import React, { ReactElement, useEffect, useState } from 'react';
import { Collapse, Slider } from 'antd';
import './Settings.scss';
import { InputField } from '../../react-plugins-deps/components/FieldsComponents/Input/Input';
import ButtonElement from '../../react-plugins-deps/components/FieldsComponents/Button/Button';
import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import SettingsService from './SettingsService';
import { showErrorNotification, showSuccessNotification } from '../../react-plugins-deps/components/helpers/notification-manager';
import { TextAreaField } from '../../react-plugins-deps/components/FieldsComponents/TextArea/TextArea';

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
  const [loading, setLoading] = useState(false);
  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: async values => {
            const settings = {
              data_retention_count: values.data_retention_count,
              data_retention: values.data_retention,
              call_home: values.call_home,
              check_for_updates: values.check_for_updates,
            };
            setLoading(true);
            try {
              await SettingsService.setSettings({ settings: settings });
              setLoading(false);
              showSuccessNotification({ message: 'Settings updated' });
            } catch (e) {
              setLoading(false);
              showErrorNotification({ message: e.message });
            }
          },
          validate: () => {},
        });
        useEffect(() => {
          form.initialize(props.settings);
        }, [props.settings]);
        // @ts-ignore
        return (
          <form onSubmit={handleSubmit}>
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
                        <InputField name={'data_retention_count'} form={form} wrapperStyle={{ width: '60%' }} />
                        <SelectField
                          form={form}
                          name={'data_retention'}
                          options={dataRetentionOptions}
                          defaultValue={'weeks'}
                          style={{ width: '40%' }}
                        />
                      </div>
                    }
                  />
                  <VerticalFormWrapper
                    label={'Call home'}
                    tooltip={
                      <PluginTooltip
                        linkText={'Read more'}
                        url={'#'}
                        text={'Option to send usage data back to Percona to let us make product better'}
                      />
                    }
                    element={<ToggleField form={form} name={'call_home'} />}
                  />
                  <VerticalFormWrapper
                    label={'Check for updates'}
                    tooltip={
                      <PluginTooltip linkText={'Read more'} url={'#'} text={'Option to check new versions and ability to update PMM from UI'} />
                    }
                    element={<ToggleField form={form} name={'check_for_updates'} />}
                  />
                </Panel>
              </Collapse>
              <ButtonElement onClick={() => {}} loading={loading} text={'Apply changes'} />
            </>
          </form>
        );
      }}
    />
  );
};

export default SettingsPart;
