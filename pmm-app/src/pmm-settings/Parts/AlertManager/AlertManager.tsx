import { VerticalFormWrapper } from '../../../react-plugins-deps/components/helpers/Helpers';
import { InputField } from '../../../react-plugins-deps/components/FormComponents/Input/Input';
import { TextAreaField } from '../../../react-plugins-deps/components/FormComponents/TextArea/TextArea';
import React, { ReactElement, useEffect, useState } from 'react';
import ButtonElement from '../../../react-plugins-deps/components/FormComponents/Button/Button';
import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import SettingsService from '../../Settings.service';
import { showErrorNotification, showSuccessNotification } from '../../../react-plugins-deps/components/helpers/notification-manager';

interface AlertManagerSettingsInterface {
  alert_manager_ip: string;
  alert_manager_rules: string;
}
const AlertManager = props => {
  const [loading, setLoading] = useState(false);
  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: async (values: AlertManagerSettingsInterface): Promise<void> => {
            const settings = {
              alert_manager_ip: values.alert_manager_ip,
              alert_manager_rules: values.alert_manager_rules,
            };
            setLoading(true);
            try {
              await SettingsService.setSettings(settings);
              setLoading(false);
              showSuccessNotification({ message: 'Alert manager settings updated' });
            } catch (e) {
              setLoading(false);
              showErrorNotification({ message: e.message });
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
              <VerticalFormWrapper
                label={'AlertManager IP'}
                element={<InputField form={form} name={'alert_manager_ip'} placeholder="Enter IP" style={{ width: '100%' }} />}
              />
              <VerticalFormWrapper
                label={'AlertManager rules'}
                element={<TextAreaField form={form} name={'alert_manager_rules'} placeholder="Alert manager rule" style={{ width: '100%' }} />}
                alignLabel={'top'}
              />
              <ButtonElement loading={loading} text={'Apply AlertManager settings'} />
            </>
          </form>
        );
      }}
    />
  );
};

export default AlertManager;
