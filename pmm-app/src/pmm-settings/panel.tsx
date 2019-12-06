import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import './panel.scss';
import AlertManager from './Parts/AlertManager';
import UploadSSHKey from './Parts/UploadSSHKey';
import Diagnostics from './Parts/Diagnostics';
import SettingsPart from './Parts/Settings';
import SettingsService from './Parts/SettingsService';

const { Panel } = Collapse;
import SettingsService from './Parts/SettingsService';

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
  useEffect(() => {
    (async () => {
      const result = await SettingsService.getSettings();
      updateSettings(result.settings);
    })();
  }, []);
  return (
    <div id={'antd'}>
      <div className={'app-theme-dark pmm-settings-panel'}>
        <Collapse bordered={false} defaultActiveKey={['1']} onChange={() => {}} style={customCollapseStyle}>
          <Panel header="Settings" key="1" style={customPanelStyle}>
            <SettingsPart settings={settings} />
          </Panel>
          <Panel header="SSH Key Details" key="3" style={customPanelStyle}>
            <UploadSSHKey settings={settings} />
          </Panel>
          <Panel header="AlertManager integration" key="4" style={customPanelStyle}>
            <AlertManager settings={settings} />
          </Panel>
          <Panel header="Diagnostics" key="5" style={customPanelStyle}>
            <Diagnostics settings={settings} />
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default SettingsPanel;
