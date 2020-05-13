import { PluginTooltip } from '../../../react-plugins-deps/components/helpers/Helpers';
import { TextAreaField } from '../../../react-plugins-deps/components/FormComponents/TextArea/TextArea';
import React, { ReactElement, useEffect, useState } from 'react';
import ButtonElement from '../../../react-plugins-deps/components/FormComponents/Button/Button';
import { Form as FormFinal } from 'react-final-form';
import SettingsService from '../../Settings.service';
import { showSuccessNotification } from '../../../react-plugins-deps/components/helpers/notification-manager';
import { FormElement } from '../../../react-plugins-deps/components/FormComponents/FormElement/FormElement';

interface UploadSSHInterface {
  ssh_key: string;
}

const UploadSSH = props => {
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const onSubmit = async (values: UploadSSHInterface) => {
    const settings = {
      ssh_key: values.ssh_key,
    };
    setLoading(true);
    try {
      await SettingsService.setSettings(settings);
      setLoading(false);
      showSuccessNotification({ message: 'SSH key updated' });
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
        return (
          <form onSubmit={handleSubmit}>
            <>
              <FormElement
                label="SSH key"
                tooltip={
                  <PluginTooltip
                    links={[
                      {
                        url:
                          'https://www.percona.com/doc/percona-monitoring-and-management' +
                          '/2.x/manage/server-admin-gui.html#ssh-key-details',
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
