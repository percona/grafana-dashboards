import { PluginTooltip } from '../../../react-plugins-deps/components/helpers/Helpers';
import { TextAreaField } from '../../../react-plugins-deps/components/FormComponents/TextArea/TextArea';
import React, { ReactNode, useEffect, useState } from 'react';
import ButtonElement from '../../../react-plugins-deps/components/FormComponents/Button/Button';
import { Form as FormFinal } from 'react-final-form';
import { SettingsService } from '../../Settings.service';
import { showSuccessNotification } from '../../../react-plugins-deps/components/helpers/notification-manager';
import { FormElement } from '../../../react-plugins-deps/components/FormComponents/FormElement/FormElement';
import { GUI_DOC_URL } from '../../panel.constants';

interface UploadSSHInterface {
  ssh_key: string;
}

const UploadSSH = ({ settings }) => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: UploadSSHInterface) => {
    setLoading(true);
    try {
      await SettingsService.setSettings({ ssh_key: values.ssh_key });
      setLoading(false);
      showSuccessNotification({ message: 'SSH key updated' });
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <FormFinal
      onSubmit={onSubmit}
      render={({ form, handleSubmit }): ReactNode => {
        useEffect(() => {
          form.initialize(settings);
        }, [settings]);
        return (
          <form onSubmit={handleSubmit}>
            <>
              <FormElement
                label="SSH key"
                tooltip={
                  <PluginTooltip
                    links={[
                      {
                        url: `${GUI_DOC_URL}#ssh-key-details`,
                        text: 'Read more',
                      },
                    ]}
                    text="Public SSH key to let you login into the server using SSH."
                  />
                }
                element={
                  <TextAreaField name="ssh_key" placeholder="Enter ssh key" style={{ width: '100%' }} />
                }
                alignLabel="top"
              />
              <ButtonElement loading={loading} text="Apply SSH key" />
            </>
          </form>
        );
      }}
    />
  );
};
export default UploadSSH;
