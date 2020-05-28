import React, { ReactElement, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { Form } from 'react-final-form';
import UploadSSH from './Parts/UploadSSH/UploadSSH';
import Diagnostics from './Parts/Diagnostics/Diagnostics';
import SettingsPart from './Parts/Settings/Settings';
import AlertManager from './Parts/AlertManager/AlertManager';
import { SettingsService } from './Settings.service';

const { Panel } = Collapse;

const customPanelStyle = {
  background: '#1f1d1d',
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

  useEffect(() => {
    (async () => {
      const response = await SettingsService.getSettings();
      updateSettings(response.settings);
    })();
  }, []);
  return (
    <div id="antd">
      <div className="app-theme-dark pmm-settings-panel">
        <Form
          onSubmit={() => {}}
          render={(): ReactElement => (
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              onChange={() => {}}
              style={customCollapseStyle}
            >
              <Panel header="Settings" key="1" style={customPanelStyle}>
                <SettingsPart settings={settings} />
              </Panel>
              <Panel header="SSH Key Details" key="2" style={customPanelStyle}>
                <UploadSSH settings={settings} />
              </Panel>
              <Panel header="Alertmanager integration" key="3" style={customPanelStyle}>
                <AlertManager settings={settings} />
              </Panel>
              <Panel header="Diagnostics" key="4" style={customPanelStyle}>
                <Diagnostics />
              </Panel>
            </Collapse>
          )}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
