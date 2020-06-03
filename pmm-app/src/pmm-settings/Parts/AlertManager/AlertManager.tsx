import React, { ReactElement, useEffect, useState } from 'react';
import { Form as FormFinal } from 'react-final-form';
import { css } from 'emotion';
import { Button, FormElement, InputField, TextAreaField } from 'react-plugins-deps/components/FormComponents';
import { showSuccessNotification } from 'react-plugins-deps/components/helpers/notification-manager';
import { PluginTooltip } from 'react-plugins-deps/components/helpers/Helpers';
import { SettingsService } from '../../Settings.service';
import { GUI_DOC_URL } from '../../panel.constants';

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
      render={({ form, handleSubmit }) => {
        useEffect(() => {
          form.initialize(props.settings);
        }, [props.settings]);
        return (
          <form onSubmit={handleSubmit}>
            <>
              <FormElement
                dataQa="form-field-am-url"
                label="Alertmanager URL"
                tooltip={
                  <PluginTooltip
                    links={[
                      {
                        url: `${GUI_DOC_URL}#prometheus-alertmanager-integration`,
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
                dataQa="form-field-alerting-rules"
                label="Prometheus Alerting rules"
                tooltip={
                  <PluginTooltip
                    links={[
                      {
                        url: `${GUI_DOC_URL}#prometheus-alertmanager-integration`,
                        text: 'How to integrate Alertmanager with PMM',
                      },
                    ]}
                    text="Alerting rules in the YAML configuration format"
                  />
                }
                element={
                  <TextAreaField
                    name="alert_manager_rules"
                    placeholder="Alerting rules"
                    className={Styling.textAreaWidth}
                  />
                }
                alignLabel="top"
              />
              <Button loading={loading} text="Apply Alertmanager settings" />
            </>
          </form>
        );
      }}
    />
  );
};

export default AlertManager;
