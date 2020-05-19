import React, { ReactElement, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { Form as FormFinal } from 'react-final-form';
import { css } from 'emotion';
import { showSuccessNotification, PluginTooltip } from 'react-plugins-deps/components/helpers';
import {
  Button,
  FormElement,
  InputField,
  SliderField,
  ToggleField,
} from 'react-plugins-deps/components/FormComponents';
import Validators from '../../../react-plugins-deps/components/validators/validators';
import { SettingsService } from '../../Settings.service';
import { GUI_DOC_URL } from '../../panel.constants';
import './Settings.scss';

const { Panel } = Collapse;

const marks = {
  0: 'Low',
  1: 'Medium',
  2: 'High',
};

const style = {
  panel: css`
    background: #1f1d1d;
    margin-bottom: 10;
    border: none !important;
    color: white;
    text-color: white;
  `,
  collapse: css`
    background: transparent;
    margin-bottom: 10;
    border: none !important;
    color: white;
    text-color: white;
  `,
};

const dataRetentionValues: MetricsResolutionInterface[] = [
  {
    hr: '60s',
    mr: '180s',
    lr: '300s',
  },
  {
    hr: '5s',
    mr: '10s',
    lr: '60s',
  },
  {
    hr: '1s',
    mr: '5s',
    lr: '30s',
  },
];

export const getMetricsResolutionValues = metricsResolutions => {
  let metricsIndex = 0;

  dataRetentionValues.forEach((resolution, index) => {
    if (
      resolution.hr === metricsResolutions.hr &&
      resolution.mr === metricsResolutions.mr &&
      resolution.lr === metricsResolutions.lr
    ) {
      metricsIndex = index;
    }
  });

  return metricsIndex;
};

const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;
const SECONDS_IN_DAY = SECONDS * MINUTES * HOURS;
const MINUTES_IN_HOUR = MINUTES * HOURS;

const transformToDays = (count, units) => {
  switch (units) {
    case 'h':
      return count / HOURS;
    case 'm':
      return count / MINUTES_IN_HOUR;
    case 's':
      return count / SECONDS_IN_DAY;
    default:
      return '';
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
  disable_stt?: boolean;
  enable_stt?: boolean;
}

const SettingsPart = props => {
  const [loading, setLoading] = useState(false);
  const { settings } = props;
  const onSubmit = async values => {
    const updatedSettings: SettingsInterface = {
      // transform count in days to seconds
      data_retention: values.data_retention_count * SECONDS_IN_DAY + 's',
      metrics_resolutions: dataRetentionValues[values.metrics_resolutions_slider],
    };

    updatedSettings.disable_telemetry = !values.telemetry_enabled;
    updatedSettings.enable_telemetry = values.telemetry_enabled;
    updatedSettings.disable_stt = !values.stt_enabled;
    updatedSettings.enable_stt = values.stt_enabled;
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
      onSubmit={onSubmit}
      render={({ form, handleSubmit }): ReactElement => {
        useEffect(() => {
          if (!settings.data_retention && !settings.metrics_resolutions) {
            form.initialize({
              // This is the slider's default, since in controlled components defaultValue can't be used
              metrics_resolutions_slider: 2,
            });
            return;
          }
          const [count, units] = [settings.data_retention.slice(0, -1), settings.data_retention.slice(-1)];
          const sliderValue = getMetricsResolutionValues(settings.metrics_resolutions);

          form.initialize({
            ...settings,
            ...{
              data_retention_count: transformToDays(count, units),
              metrics_resolutions_slider: sliderValue,
              updates_disabled: !settings.updates_disabled,
            },
          });
        }, [settings]);
        // @ts-ignore
        return (
          <form onSubmit={handleSubmit}>
            <>
              <FormElement
                label="Metrics resolution"
                tooltip={
                  <PluginTooltip
                    links={[
                      {
                        url: `${GUI_DOC_URL}#server-admin-gui-metrics-resolution`,
                        text: 'Read more',
                      },
                    ]}
                    text="This setting defines how frequently the data will be collected"
                  />
                }
                element={
                  <SliderField
                    marks={marks}
                    name="metrics_resolutions_slider"
                    tipFormatter={value => {
                      const values = dataRetentionValues[value];
                      return `high: ${values.hr}, medium: ${values.mr}, low: ${values.lr}`;
                    }}
                  />
                }
              />
              <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                onChange={() => {}}
                className={style.collapse}
              >
                <Panel header="Advanced settings " key="1" className={style.panel}>
                  <FormElement
                    label="Data retention (days)"
                    tooltip={
                      <PluginTooltip
                        links={[
                          {
                            url:
                              'https://www.percona.com/doc/percona-monitoring-and-management/' +
                              '2.x/faq.html#how-to-control-data-retention-for-pmm',
                            text: 'Read more',
                          },
                        ]}
                        text="This is the value for how long data will be stored"
                      />
                    }
                    element={
                      <InputField
                        name="data_retention_count"
                        validate={Validators.compose(Validators.range(1, 3650), Validators.required)}
                        wrapperStyle={{ width: '100%' }}
                      />
                    }
                  />
                  <FormElement
                    label="Telemetry"
                    type="horizontal"
                    tooltip={
                      <PluginTooltip
                        links={[
                          {
                            url: `${GUI_DOC_URL}#server-admin-gui-telemetry`,
                            text: 'Read more',
                          },
                        ]}
                        text="Option to send usage data back to Percona to let us make product better"
                      />
                    }
                    element={
                      <ToggleField name="telemetry_enabled" disabled={form.getState().values.stt_enabled} />
                    }
                  />
                  <FormElement
                    label="Check for updates"
                    type="horizontal"
                    tooltip={
                      <PluginTooltip
                        links={[
                          {
                            url: `${GUI_DOC_URL}#check-for-updates`,
                            text: 'Read more',
                          },
                        ]}
                        text="Option to check new versions and ability to update PMM from UI"
                      />
                    }
                    element={<ToggleField name="updates_disabled" disabled />}
                  />
                  <FormElement
                    label="Security Threat Tool"
                    type="horizontal"
                    tooltip={
                      <PluginTooltip
                        links={[
                          {
                            url: `${GUI_DOC_URL}#security-threat-tool`,
                            text: 'Read more',
                          },
                        ]}
                        text="Enable Security Threat Tool and get updated checks from Percona"
                      />
                    }
                    element={
                      <ToggleField name="stt_enabled" disabled={!form.getState().values.telemetry_enabled} />
                    }
                  />
                </Panel>
              </Collapse>
              <Button loading={loading} text="Apply changes" />
            </>
          </form>
        );
      }}
    />
  );
};

export default SettingsPart;
