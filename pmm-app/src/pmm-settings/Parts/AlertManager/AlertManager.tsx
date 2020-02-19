import { InputField } from '../../../react-plugins-deps/components/FormComponents/Input/Input';
import { TextAreaField } from '../../../react-plugins-deps/components/FormComponents/TextArea/TextArea';
import React, { ReactElement, useEffect, useState } from 'react';
import ButtonElement from '../../../react-plugins-deps/components/FormComponents/Button/Button';
import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import SettingsService from '../../Settings.service';
import { showSuccessNotification } from '../../../react-plugins-deps/components/helpers/notification-manager';
import { FormElement } from '../../../react-plugins-deps/components/FormComponents/FormElement/FormElement';

interface AlertManagerSettingsInterface {
  alert_manager_url: string;
  alert_manager_rules: string;
  remove_alert_manager_url?: boolean;
  remove_alert_manager_rules?: boolean;
}

const AlertManager = props => {
  const [loading, setLoading] = useState(false);
  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: async (values: AlertManagerSettingsInterface): Promise<void> => {
            const settings: AlertManagerSettingsInterface = {
              alert_manager_url: values.alert_manager_url || '',
              alert_manager_rules: values.alert_manager_rules || '',
            };

            if (!values.alert_manager_url) {
              settings.remove_alert_manager_url = true;
            }

            if (!values.alert_manager_rules) {
              settings.remove_alert_manager_rules = true;
            }

            setLoading(true);
            try {
              await SettingsService.setSettings(settings);
              setLoading(false);
              showSuccessNotification({
                message: 'Alert manager settings updated',
              });
            } catch (e) {
              setLoading(false);
            }
          },
          validate: () => undefined,
        });
        useEffect(() => {
          form.initialize(props.settings);
        }, [props.settings]);
        // @ts-ignore
        return (
          <form onSubmit={handleSubmit}>
            <>
              <FormElement
                label="Alertmanager URL"
                tooltip={
                  <PluginTooltip
                    links={[
                      {
                        url: 'https://percona.com/doc/percona-monitoring-and-management/2.x/faq.html#how-to-integrate-alertmanager-with-pmm',
                        text: 'How to integrate Alertmanager with PMM',
                      },
                      {
                        url: 'https://prometheus.io/docs/alerting/alertmanager/',
                        text: 'Prometheus Alertmanager',
                      },
                    ]}
                    text={'The URL of the external Alertmanager to use'}
                  />
                }
                element={<InputField form={form} name="alert_manager_url" placeholder="Enter URL" style={{ width: '100%' }} />}
              />
              <FormElement
                label="Alertmanager rules"
                tooltip={
                  <PluginTooltip
                    links={[
                      {
                        url: 'https://percona.com/doc/percona-monitoring-and-management/2.x/faq.html#how-to-integrate-alertmanager-with-pmm',
                        text: 'How to integrate Alertmanager with PMM',
                      },
                      {
                        url: 'https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/',
                        text: 'Prometheus alerting rules',
                      },
                    ]}
                    text={'Alerting rules in the YAML configuration format'}
                  />
                }
                element={<TextAreaField form={form} name="alert_manager_rules" placeholder="Alertmanager rules" style={{ width: '100%' }} />}
                alignLabel="top"
              />
              <ButtonElement loading={loading} text="Apply Alertmanager settings" />
            </>
          </form>
        );
      }}
    />
  );
};

export default AlertManager;
