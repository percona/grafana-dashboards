import React, {
  FC,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  Spinner,
  TabContent,
  Tab,
  useTheme
} from '@grafana/ui';
import { cx } from 'emotion';
import { TabsVertical } from 'shared/components/Elements/TabsVertical/TabsVertical';
import { Diagnostics } from './components/Diagnostics/Diagnostics';
import { MetricsResolution } from './components/MetricsResolution/MetricsResolution';
import { SSHKey } from './components/SSHKey/SSHKey';
import { AlertManager } from './components/AlertManager/AlertManager';
import { Advanced } from './components/Advanced/Advanced';
import { SettingsService, LoadingCallback } from './Settings.service';
import { Settings } from './Settings.types';
import { Messages } from './Settings.messages';
import { getSettingsStyles } from './Settings.styles';


export const SettingsPanel: FC = () => {
  const theme = useTheme();
  const styles = getSettingsStyles(theme);
  const [activeTab, setActiveTab] = useState('metrics');
  const {
    metrics,
    advanced,
    ssh,
    alertManager
  } = Messages.tabs;
  const tabs = useMemo(
    () => [
      { label: metrics, key: 'metrics', active: activeTab === 'metrics' },
      { label: advanced, key: 'advanced', active: activeTab === 'advanced' },
      { label: ssh, key: 'ssh', active: activeTab === 'ssh' },
      { label: alertManager, key: 'alertManager', active: activeTab === 'alertManager' },
    ],
    [activeTab]
  );
  const [settings, setSettings] = useState<Settings>();
  const [loading, setLoading] = useState(true);
  const updateSettings = async (body: any, callback: LoadingCallback) => {
    const response = await SettingsService.setSettings(body, callback);

    if (response) {
      setSettings(response);
    }
  };

  useEffect(() => {
    (async () => {
      setSettings(await SettingsService.getSettings(setLoading));
    })();
  }, []);

  return (
    <div className={styles.settingsWrapper}>
      <TabsVertical
        className={styles.tabsWrapper}
        dataQa="settings-tabs"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            active={tab.active}
            onChangeTab={() => setActiveTab(tab.key)}
          />
        ))}
      </TabsVertical>
      <TabContent
        className={cx(styles.tabContentWrapper, { [styles.settingsLoading]: loading })}
      >
        {loading && <Spinner />}
        {(!loading && settings) && (
        <>
          {tabs[0].active
                && (
                <MetricsResolution
                  metricsResolutions={settings.metricsResolutions}
                  updateSettings={updateSettings}
                />
                )}
          {tabs[1].active
                && (
                <Advanced
                  dataRetention={settings.dataRetention}
                  telemetryEnabled={!!settings.telemetryEnabled}
                  sttEnabled={!!settings.sttEnabled}
                  updateSettings={updateSettings}
                />
                )}
          {tabs[2].active
                && (
                <SSHKey
                  sshKey={settings.sshKey || ''}
                  updateSettings={updateSettings}
                />
                )}
          {tabs[3].active
                && (
                <AlertManager
                  alertManagerUrl={settings.alertManagerUrl || ''}
                  alertManagerRules={settings.alertManagerRules || ''}
                  updateSettings={updateSettings}
                />
                )}
        </>
        )}
      </TabContent>
      <Diagnostics />
    </div>
  );
};
