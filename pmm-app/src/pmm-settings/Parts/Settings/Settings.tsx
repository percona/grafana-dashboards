import React, { ReactElement, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import { PluginTooltip, VerticalFormWrapper } from '../../../react-plugins-deps/components/helpers/Helpers';
import SettingsService from '../../Settings.service';
import { showSuccessNotification } from '../../../react-plugins-deps/components/helpers/notification-manager';
import { SliderField } from '../../../react-plugins-deps/components/FormComponents/Slider/Slider';
import { SelectField } from '../../../react-plugins-deps/components/FormComponents/Select/Select';
import { ToggleField } from '../../../react-plugins-deps/components/FormComponents/Toggle/Toggle';
import { InputField } from '../../../react-plugins-deps/components/FormComponents/Input/Input';
import ButtonElement from '../../../react-plugins-deps/components/FormComponents/Button/Button';
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

export const getMetricsResolutionValues = metricsResolutions => {
  let metricsIndex = 0;

  dataRetentionValues.forEach((resolution, index) => {
    if (resolution.hr === metricsResolutions.hr && resolution.mr === metricsResolutions.mr && resolution.lr === metricsResolutions.lr) {
      metricsIndex = index;
    }
  });

  return metricsIndex;
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

    updatedSettings.disable_telemetry = !values.telemetry_enabled;
    updatedSettings.enable_telemetry = values.telemetry_enabled;

    setLoading(true);
    try {
      await SettingsService.setSettings(updatedSettings);
      setLoading(false);
      showSuccessNotification({ message: 'Settings updated' });
    } catch (e) {
      setLoading(false);
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
            Object.assign(settings, {
              data_retention_count: count,
              data_retention_units: units,
              metrics_resolutions_slider: sliderValue,
              updates_disabled: !settings.updates_disabled,
            })
          );
        }, [settings]);

        // @ts-ignore
        return (
          <form onSubmit={handleSubmit}>
            <>
              <VerticalFormWrapper
                label={'Metrics resolution'}
                tooltip={
                  <PluginTooltip
                    linkText={'Read more'}
                    url={'https://www.percona.com/doc/percona-monitoring-and-management/2.x/faq.html#what-resolution-is-used-for-metrics'}
                    text={'This setting defines how frequently the data will be collected'}
                  />
                }
                element={
                  <SliderField
                    marks={marks}
                    form={form}
                    defaultValue={2}
                    name={'metrics_resolutions_slider'}
                    tipFormatter={value => {
                      const values = dataRetentionValues[value];
                      return `high: ${values.hr}, medium: ${values.mr}, low: ${values.lr}`;
                    }}
                  />
                }
              />
              <Collapse bordered={false} defaultActiveKey={['1']} onChange={() => {}} style={customCollapseStyle}>
                <Panel header="Advanced settings " key="1" style={customPanelStyle}>
                  <VerticalFormWrapper
                    label={'Data retention'}
                    tooltip={
                      <PluginTooltip
                        linkText={'Read more'}
                        url={'https://www.percona.com/doc/percona-monitoring-and-management/2.x/faq.html#how-to-control-data-retention-for-pmm'}
                        text={'This is the value for how long data will be stored'}
                      />
                    }
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
                        url={'https://www.percona.com/doc/percona-monitoring-and-management/2.x/glossary-terminology.html#Telemetry'}
                        text={'Option to send usage data back to Percona to let us make product better'}
                      />
                    }
                    element={<ToggleField form={form} name={'telemetry_enabled'} />}
                  />
                  <VerticalFormWrapper
                    label={'Check for updates'}
                    tooltip={
                      <PluginTooltip
                        linkText={'Read more'}
                        url={'https://www.percona.com/doc/percona-monitoring-and-management/2.x/glossary-terminology.html#PMM-Version'}
                        text={'Option to check new versions and ability to update PMM from UI'}
                      />
                    }
                    element={<ToggleField form={form} name={'updates_disabled'} disabled={true} />}
                  />
                </Panel>
              </Collapse>
              <ButtonElement loading={loading} text={'Apply changes'} />
            </>
          </form>
        );
      }}
    />
  );
};

export default SettingsPart;
