import React, { ReactElement, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import { PluginTooltip, VerticalFormWrapper } from '../../react-plugins-deps/components/helpers/Helpers';
import SettingsService from '../Settings.service';
import { showErrorNotification, showSuccessNotification } from '../../react-plugins-deps/components/helpers/notification-manager';
import { SliderField } from '../../react-plugins-deps/components/FieldsComponents/Slider/Slider';
import { SelectField } from '../../react-plugins-deps/components/FieldsComponents/Select/Select';
import { ToggleField } from '../../react-plugins-deps/components/FieldsComponents/Toggle/Toggle';
import { InputField } from '../../react-plugins-deps/components/FieldsComponents/Input/Input';
import ButtonElement from '../../react-plugins-deps/components/FieldsComponents/Button/Button';
import './Settings.scss';

const { Panel } = Collapse;
const dataRetentionOptions = [
  { value: 'h', label: 'Hours' },
  { value: 'm', label: 'Minutes' },
  { value: 's', label: 'Seconds' },
];
const marks = {
  0: 'Low',
  1: 'Medium',
  2: 'High',
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

const dataRetentionValues: MetricsResolutionInterface[] = [
  {
    hr: '60s',
    mr: '180s',
    lr: '300s',
  },
  {
    hr: '5s',
    mr: '30s',
    lr: '300s',
  },
  {
    hr: '5s',
    mr: '5s',
    lr: '60s',
  },
];

const getMetricsResolutionValues = metricsResolutions => {
  if (metricsResolutions.hr === '5s' && metricsResolutions.mr === '5s' && metricsResolutions.lr === '60s') {
    return 2;
  } else if (metricsResolutions.hr === '5s' && metricsResolutions.mr === '30s' && metricsResolutions.lr === '300s') {
    return 1;
  } else if (metricsResolutions.hr === '60s' && metricsResolutions.mr === '180s' && metricsResolutions.lr === '300s') {
    return 0;
  } else {
    return 0;
  }
};
interface MetricsResolutionInterface {
  lr: string;
  mr: string;
  hr: string;
}
interface SettingsInterface {
  data_retention: string;
  metrics_resolutions: MetricsResolutionInterface;
  disable_telemetry?: boolean;
  enable_telemetry?: boolean;
}
const SettingsPart = props => {
  const [loading, setLoading] = useState(false);
  const { settings } = props;
  const onSubmit = async values => {
    const updatedSettings: SettingsInterface = {
      data_retention: values.data_retention_count + values.data_retention_units,
      metrics_resolutions: dataRetentionValues[values.metrics_resolutions_slider],
    };

    if (values.telemetry_enabled) {
      updatedSettings.disable_telemetry = false;
      updatedSettings.enable_telemetry = true;
    } else {
      updatedSettings.disable_telemetry = true;
      updatedSettings.enable_telemetry = false;
    }
    setLoading(true);
    try {
      await SettingsService.setSettings(updatedSettings);
      setLoading(false);
      showSuccessNotification({ message: 'Settings updated' });
    } catch (e) {
      setLoading(false);
      showErrorNotification({ message: e.message });
    }
  };

  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: onSubmit,
          validate: () => undefined,
        });

        useEffect(() => {
          if (!settings.data_retention && !settings.metrics_resolutions) {
            return;
          }
          const [count, units] = [settings.data_retention.slice(0, -1), settings.data_retention.slice(-1)];
          const sliderValue = getMetricsResolutionValues(settings.metrics_resolutions);

          form.initialize(
            Object.assign(settings, { data_retention_count: count, data_retention_units: units, metrics_resolutions_slider: sliderValue })
          );
        }, [settings]);

        // @ts-ignore
        return (
          <form onSubmit={handleSubmit}>
            <>
              <VerticalFormWrapper
                label={'Metrics resolution'}
                tooltip={<PluginTooltip linkText={'Read more'} url={'#'} text={'This setting defines how frequently the data will be collected'} />}
                element={<SliderField marks={marks} form={form} defaultValue={2} name={'metrics_resolutions_slider'} />}
              />
              <Collapse bordered={false} defaultActiveKey={['1']} onChange={() => {}} style={customCollapseStyle}>
                <Panel header="Advanced settings " key="1" style={customPanelStyle}>
                  <VerticalFormWrapper
                    label={'Data retention'}
                    tooltip={<PluginTooltip linkText={'Read more'} url={'#'} text={'This is the value for how long data will be stored'} />}
                    element={
                      <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                        <InputField name={'data_retention_count'} form={form} wrapperStyle={{ width: '60%' }} />
                        <SelectField
                          form={form}
                          name={'data_retention_units'}
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
                    element={<ToggleField form={form} name={'telemetry_enabled'} />}
                  />
                  <VerticalFormWrapper
                    label={'Check for updates'}
                    tooltip={
                      <PluginTooltip linkText={'Read more'} url={'#'} text={'Option to check new versions and ability to update PMM from UI'} />
                    }
                    element={<ToggleField form={form} name={'updates_disabled'} disabled={true} />}
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
