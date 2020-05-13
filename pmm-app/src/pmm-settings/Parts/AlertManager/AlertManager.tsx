import { InputField } from '../../../react-plugins-deps/components/FormComponents/Input/Input';
import { TextAreaField } from '../../../react-plugins-deps/components/FormComponents/TextArea/TextArea';
import React, { ReactElement, useEffect, useState } from 'react';
import ButtonElement from '../../../react-plugins-deps/components/FormComponents/Button/Button';
import { Form as FormFinal } from 'react-final-form';
import SettingsService from '../../Settings.service';
import { showSuccessNotification } from '../../../react-plugins-deps/components/helpers/notification-manager';
import { FormElement } from '../../../react-plugins-deps/components/FormComponents/FormElement/FormElement';
import { PluginTooltip } from '../../../react-plugins-deps/components/helpers/Helpers';
import { css } from 'emotion';

interface AlertManagerSettingsInterface {
  alert_manager_url: string;
  alert_manager_rules: string;
  remove_alert_manager_url?: boolean;
  remove_alert_manager_rules?: boolean;
}

const Styling = {
  textAreaWidth: css`
    width: 100%;
  `,
};

const AlertManager = props => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: AlertManagerSettingsInterface): Promise<void> => {
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
  };
  return (
    <FormFinal
      onSubmit={onSubmit}
      render={({ form, handleSubmit }): ReactElement => {
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
                        url:
                          'https://percona.com/doc/percona-monitoring-and-management' +
                          '2.x/faq.html#how-to-integrate-alertmanager-with-pmm',
                        text: 'How to integrate Alertmanager with PMM',
                      },
                    ]}
                    text="The URL of the external Alertmanager to use"
                  />
                }
                element={
                  <InputField
                    name="alert_manager_url"
                    placeholder="Enter URL"
                    className={Styling.textAreaWidth}
                  />
                }
              />
              <FormElement
                label="Prometheus Alerting rules"
                tooltip={
                  <PluginTooltip
                    links={[
                      {
                        url:
                          'https://percona.com/doc/percona-monitoring-and-management/' +
                          '2.x/faq.html#how-to-integrate-alertmanager-with-pmm',
                        text: 'How to integrate Alertmanager with PMM',
                      },
                    ]}
                    text="Alerting rules in the YAML configuration format"
                  />
                }
                element={
                  <TextAreaField
                    name="alert_manager_rules"
                    placeholder="Alertmanager rules"
                    className={Styling.textAreaWidth}
                  />
                }
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
