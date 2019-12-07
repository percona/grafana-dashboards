import { PluginTooltip, VerticalFormWrapper } from '../../react-plugins-deps/components/helpers/Helpers';
import { TextAreaField } from '../../react-plugins-deps/components/FieldsComponents/TextArea/TextArea';
import React, { ReactElement, useEffect, useState } from 'react';
import ButtonElement from '../../react-plugins-deps/components/FieldsComponents/Button/Button';
import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import SettingsService from './SettingsService';
import { showErrorNotification, showSuccessNotification } from '../../react-plugins-deps/components/helpers/notification-manager';

const UploadSSHKey = props => {
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: async values => {
            const settings = {
              ssh_key: values.ssh_key,
            };
            setLoading(true);
            try {
              await SettingsService.setSettings({ settings: settings });
              setLoading(false);
              showSuccessNotification({ message: 'SSH key updated' });
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
                label={'SSH key'}
                tooltip={<PluginTooltip linkText={'Read more'} url={'#'} text={'Public SSH key to let you login into the server using SSH.'} />}
                element={<TextAreaField name={'ssh_key'} form={form} placeholder="Enter ssh key" style={{ width: '100%' }} />}
                alignLabel={'top'}
              />
              <ButtonElement onClick={() => {}} loading={loading} text={'Apply SSH key'} />
            </>
          </form>
        );
      }}
    />
  );
};
export default UploadSSHKey;
