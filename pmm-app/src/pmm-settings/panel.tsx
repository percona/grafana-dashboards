import React, { ReactElement, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import './panel.scss';
// import AlertManager from './Parts/AlertManager';
import UploadSSHKey from './Parts/UploadSSHKey';
import Diagnostics from './Parts/Diagnostics';
import SettingsPart from './Parts/Settings';
import SettingsService from './Settings.service';
import { Form as FormFinal } from 'react-final-form';

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
      const { settings } = await SettingsService.getSettings();

      updateSettings(settings);
    })();
  }, []);
  return (
    <div id={'antd'}>
      <div className={'app-theme-dark pmm-settings-panel'}>
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
                  <UploadSSHKey settings={settings} />
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
