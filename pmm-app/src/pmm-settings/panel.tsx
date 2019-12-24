import React, { ReactElement, useEffect, useState } from 'react';
import { Collapse } from 'antd';
// import AlertManager from './Parts/AlertManager';
import UploadSSH from './Parts/UploadSSH/UploadSSH';
import Diagnostics from './Parts/Diagnostics/Diagnostics';
import SettingsPart from './Parts/Settings/Settings';
import SettingsService from './Settings.service';
import { Form as FormFinal } from 'react-final-form';
import Styling from '../react-plugins-deps/components/helpers/styling';

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
  // document.getElementById('antd').classList.add('custom-grafana-plugin');
  const [settings, updateSettings] = useState({});

  useEffect(() => {
    (async () => {
      Styling.setPluginPanelClass();
      const { settings } = await SettingsService.getSettings();
      updateSettings(settings);
    })();
  }, []);
  return (
    <div id={'antd'}>
      <div className={'app-theme-dark pmm-settings-panel'} style={{ width: '100%' }}>
        <FormFinal
          onSubmit={() => {}}
          render={(): ReactElement => {
            // @ts-ignore
            return (
              <Collapse bordered={false} defaultActiveKey={['1']} onChange={() => {}} style={customCollapseStyle}>
                <Panel header="Settings" key="1" style={customPanelStyle}>
                  <SettingsPart settings={settings} />
                </Panel>
                <Panel header="SSH Key Details" key="2" style={customPanelStyle}>
                  <UploadSSH settings={settings} />
                </Panel>
                {/*<Panel header="AlertManager integration" key="3" style={customPanelStyle}>*/}
                {/*  <AlertManager settings={settings} />*/}
                {/*</Panel>*/}
                <Panel header="Diagnostics" key="4" style={customPanelStyle}>
                  <Diagnostics />
                </Panel>
              </Collapse>
            );
          }}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
