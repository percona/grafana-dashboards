import React, { FC, useEffect, useMemo, useState } from 'react';
import { createBrowserHistory } from 'history';
import { Spinner, TabsBar, TabContent, Tab } from '@grafana/ui';
import { Router, Route } from 'react-router-dom';
import { Settings, TabKeys, TabEntry, CheckPanelProps } from './types';
import { CheckService } from './Check.service';
import * as styles from './CheckPanel.styles';
import { Messages } from './CheckPanel.messages';
import { FailedChecksTab } from './components';

const history = createBrowserHistory();

export const CheckPanel: FC<CheckPanelProps> = () => {
  const [activeTab, setActiveTab] = useState(TabKeys.failedChecks);
  const [hasNoAccess, setHasNoAccess] = useState(false);
  const [isSttEnabled, setIsSttEnabled] = useState(false);
  const [getSettingsPending, setGetSettingsPending] = useState(false);

  const getSettings = async () => {
    try {
      setGetSettingsPending(true);
      const resp = (await CheckService.getSettings()) as Settings;

      setIsSttEnabled(!!resp.settings?.stt_enabled);
      setHasNoAccess(false);

    } catch (err) {
      if (err.response?.status === 401) {
        setHasNoAccess(true);
      }

      console.error(err);
    } finally {
      setGetSettingsPending(false);
    }
  };

  useEffect(() => {
    const settings = async () => {
      await getSettings();
    }
    settings();
  }, [])

  const tabs = useMemo<TabEntry[]>(() => [
    {
      label: Messages.failedChecksTitle,
      key: TabKeys.failedChecks,
      component: <FailedChecksTab hasNoAccess={hasNoAccess} isSttEnabled={isSttEnabled} />
    },
    {
      label: Messages.allChecksTitle,
      key: TabKeys.allChecks,
      component: <FailedChecksTab hasNoAccess={hasNoAccess} isSttEnabled={isSttEnabled} />
    },
  ],
  [hasNoAccess, isSttEnabled]);

  return (
    <div className={styles.panel} data-qa="db-check-panel">
      {getSettingsPending ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <>
            <TabsBar>
              {tabs.map((tab) => (
                <Tab
                  key={tab.key}
                  label={tab.label}
                  active={tab.key === activeTab}
                  onChangeTab={() => setActiveTab(tab.key)}
                />
              ))}
            </TabsBar>
            <TabContent>
              {tabs.map((tab) => tab.key === activeTab && tab.component)}
            </TabContent>
        </>
      )}
    </div>
  );
};

export const CheckPanelRouter: FC<CheckPanelProps> = (props) => (
  <Router history={history}>
    <Route>
      <CheckPanel {...props} />
    </Route>
  </Router>
);
