import React, { ReactElement, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import './panel.scss';
import AlertManager from './Parts/AlertManager';
import UploadSSHKey from './Parts/UploadSSHKey';
import Diagnostics from './Parts/Diagnostics';
import SettingsPart from './Parts/Settings';
import SettingsService from './Parts/SettingsService';
import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import { showErrorNotification, showSuccessNotification } from '../react-plugins-deps/components/helpers/notification-manager';

const { Panel } = Collapse;

const customPanelStyle = {
  background: 'rgb(51, 51, 51)',
  marginBottom: 10,
  border: 1,
  borderColor: 'white',
  color: 'white',
  textColor: 'white',
};

const customCollapseStyle = {
  background: 'transparent',
  marginBottom: 10,
  border: 1,
  borderColor: 'black',
  color: 'white',
  textColor: 'white',
};

const SettingsPanel = () => {
  const [settings, updateSettings] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await SettingsService.getSettings();
      updateSettings(result.settings);
    })();
  }, []);
  return (
    <div id={'antd'}>
      <div className={'app-theme-dark pmm-settings-panel'}>
        <FormFinal
          onSubmit={() => {}}
          render={(): ReactElement => {
            const { form, handleSubmit } = useForm({
              onSubmit: async values => {
                let message;
                let updatedValues;
                let type = 'settings';
                switch (type) {
                  case 'settings':
                    console.log('settings');
                    message = 'Settings updated!';
                    updatedValues = {};
                    break;
                  case 'ssh':
                    console.log('settings');
                    message = 'SSH key updated';
                    updatedValues = {};
                    break;
                  case 'alert-manager':
                    console.log('settings');
                    message = 'Alert Manager settings updated';
                    updatedValues = {};
                    break;
                }

                setLoading(true);
                try {
                  await SettingsService.setSettings(values);
                  setLoading(false);
                  showSuccessNotification({ message: message });
                } catch (e) {
                  setLoading(false);
                  showErrorNotification({ message: e.message });
                }
              },
              validate: () => {},
            });
            useEffect(() => {
              form.initialize(settings);
            }, [settings]);
            // @ts-ignore
            return (
              <form onSubmit={handleSubmit}>
                <Collapse bordered={false} defaultActiveKey={['1']} onChange={() => {}} style={customCollapseStyle}>
                  <Panel header="Settings" key="1" style={customPanelStyle}>
                    <SettingsPart form={form} />
                  </Panel>
                  <Panel header="SSH Key Details" key="3" style={customPanelStyle}>
                    <UploadSSHKey form={form} />
                  </Panel>
                  <Panel header="AlertManager integration" key="4" style={customPanelStyle}>
                    <AlertManager form={form} />
                  </Panel>
                  <Panel header="Diagnostics" key="5" style={customPanelStyle}>
                    <Diagnostics form={form} />
                  </Panel>
                </Collapse>
              </form>
            );
          }}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
