import { PluginTooltip, VerticalFormWrapper } from '../../react-plugins-deps/components/helpers/Helpers';
import { TextAreaField } from '../../react-plugins-deps/components/FieldsComponents/TextArea/TextArea';
import React from 'react';
import PanelForm from '../../react-plugins-deps/components/helpers/PanelForm';
import SettingsService from './SettingsService';
import { showErrorNotification, showSuccessNotification } from '../../react-plugins-deps/components/helpers/notification-manager';
import ButtonElement from '../../react-plugins-deps/components/FieldsComponents/Button/Button';

const UploadSSHKey = props => {
  // @ts-ignore
  return (
    <>
      <VerticalFormWrapper
        label={'SSH key'}
        tooltip={<PluginTooltip linkText={'Read more'} url={'#'} text={'Public SSH key to let you login into the server using SSH.'} />}
        element={<TextAreaField name={'ssh-key'} form={props.form} placeholder="Enter ssh key" style={{ width: '100%' }} />}
        alignLabel={'top'}
      />
      <ButtonElement onClick={() => {}} loading={props.loading} text={'Apply SSH key'} />
    </>
  );
};

export default PanelForm({
  Element: UploadSSHKey,
  onSubmit: async (values, setLoading) => {
    console.log(values, '-----');
    setLoading(true);
    try {
      await SettingsService.setSettings(values);
      setLoading(false);
      showSuccessNotification({ message: 'SSH key updated' });
    } catch (e) {
      setLoading(false);
      showErrorNotification({ message: e.message });
    }
  },
  validate: () => {},
});
