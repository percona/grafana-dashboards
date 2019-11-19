import React from 'react';
import { Collapse } from 'antd';
// import '../react-plugins-deps/antd.withoutglobal.css';
import '../react-plugins-deps/styles.scss';
import './panel.scss';
import AlertManager from './Parts/AlertManager';
import UploadSSHKey from './Parts/UploadSSHKey';
import Diagnostics from './Parts/Diagnostics';
import SettingsPart from './Parts/Settings';
import { CheckboxField } from '../react-plugins-deps/components/FieldsComponents/Checkbox';
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
  return (
    <div className={'app-theme-dark pmm-settings-panel'}>
      <Collapse bordered={false} defaultActiveKey={['1']} onChange={() => {}} style={customCollapseStyle}>
        <Panel header="Settings" key="1" style={customPanelStyle}>
          <SettingsPart />
          <CheckboxField name={'tester'} data-cy={'dsa'} />
        </Panel>
        <Panel header="SSH Key Details" key="3" style={customPanelStyle}>
          <UploadSSHKey />
        </Panel>
        <Panel header="AlertManager integration" key="4" style={customPanelStyle}>
          <AlertManager />
        </Panel>
        <Panel header="Diagnostics" key="5" style={customPanelStyle}>
          <Diagnostics />
        </Panel>
      </Collapse>
    </div>
  );
};

export default SettingsPanel;
