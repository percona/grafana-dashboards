import { PluginTooltip, VerticalFormWrapper } from '../../react-plugins-deps/components/helpers/Helpers';
import { InputField } from '../../react-plugins-deps/components/FieldsComponents/Input/Input';
import { TextAreaField } from '../../react-plugins-deps/components/FieldsComponents/TextArea/TextArea';
import React, { ReactElement, useEffect, useState } from 'react';
import ButtonElement from '../../react-plugins-deps/components/FieldsComponents/Button/Button';
import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import SettingsService from './SettingsService';
import { showErrorNotification, showSuccessNotification } from '../../react-plugins-deps/components/helpers/notification-manager';
import set = Reflect.set;

const AlertManager = props => {
  const [loading, setLoading] = useState(false);

  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: async values => {
            const settings = {
              alert_manager_ip: values.alert_manager_ip,
              alert_manager_rules: values.alert_manager_rules,
            };
            setLoading(true);
            try {
              await SettingsService.setSettings({settings: settings});
              setLoading(false);
              showSuccessNotification({ message: 'Alert manager settings updated' });
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
                label={'AlertManager IP'}
                element={<InputField form={form} name={'alert_manager_ip'} placeholder="Enter IP" style={{ width: '100%' }} />}
              />
              <VerticalFormWrapper
                label={'AlertManager rules'}
                element={<TextAreaField form={form} name={'alert_manager_rules'} placeholder="Alert manager rule" style={{ width: '100%' }} />}
                alignLabel={'top'}
              />
              <ButtonElement onClick={() => {}} loading={loading} text={'Apply AlertManager settings'} />
            </>
          </form>
        );
      }}
    />
  );
};

export default AlertManager;
