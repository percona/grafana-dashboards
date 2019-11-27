import { VerticalFormWrapper } from '../../react-plugins-deps/components/helpers/Helpers';
import { InputField } from '../../react-plugins-deps/components/FieldsComponents/Input/Input';
import { TextAreaField } from '../../react-plugins-deps/components/FieldsComponents/TextArea/TextArea';
import React from 'react';
import PanelForm from '../../react-plugins-deps/components/helpers/PanelForm';
import SettingsService from './SettingsService';
import { showErrorNotification, showSuccessNotification } from '../../react-plugins-deps/components/helpers/notification-manager';

const AlertManager = props => {
  const { form } = props;
  return (
    <>
      <VerticalFormWrapper
        label={'AlertManager IP'}
        element={<InputField form={form} name={'alert_manager_ip'} placeholder="Enter IP" style={{ width: '100%' }} />}
      />
      <VerticalFormWrapper
        label={'AlertManager rules'}
        element={<TextAreaField form={form} name={'alert_manager_rules'} placeholder="Alert manager rule" style={{ width: '100%' }} />}
      />
      <button type="submit" className="button button--dark" id="addInstance" style={{ color: 'white' }}>
        Apply AlertManager settings
      </button>
    </>
  );
};

// export default PanelForm({ Element: AlertManager });

export default PanelForm({
  Element: AlertManager,
  onSubmit: async (values, setLoading) => {
    setLoading(true);
    try {
      await SettingsService.setSettings(values);
      setLoading(false);
      showSuccessNotification({ message: 'Alert Manager settings updated' });
    } catch (e) {
      setLoading(false);
      showErrorNotification({ message: e.message });
    }
  },
  validate: () => {},
});
