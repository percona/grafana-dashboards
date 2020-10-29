import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { createBrowserHistory } from 'history';
import {
  Spinner, Tab, TabContent, TabsBar,
} from '@grafana/ui';
import { Route, Router } from 'react-router-dom';
import { Settings, TabEntry, TabKeys } from './types';
import { CheckService } from './Check.service';
import * as styles from './CheckPanel.styles';
import { Messages } from './CheckPanel.messages';
import { AllChecksTab, FailedChecksTab } from './components';

const history = createBrowserHistory();

export const CheckPanel: FC = () => {
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
      setHasNoAccess(err.response?.status === 401);

      console.error(err);
    } finally {
      setGetSettingsPending(false);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  const tabs = useMemo<TabEntry[]>(() => [
    {
      label: Messages.failedChecksTitle,
      key: TabKeys.failedChecks,
      component: <FailedChecksTab hasNoAccess={hasNoAccess} isSttEnabled={isSttEnabled} />,
    },
    {
      label: Messages.allChecksTitle,
      key: TabKeys.allChecks,
      component: <AllChecksTab />,
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
          <TabsBar className={styles.tabBar} data-qa="db-check-tabs-bar">
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                label={tab.label}
                active={tab.key === activeTab}
                onChangeTab={() => setActiveTab(tab.key)}
              />
            ))}
          </TabsBar>
          <TabContent className={styles.tabContent} data-qa="db-check-tab-content">
            {tabs.map((tab) => tab.key === activeTab && tab.component)}
          </TabContent>
        </>
      )}
    </div>
  );
};

export const CheckPanelRouter: FC = () => (
  <Router history={history}>
    <Route>
      <CheckPanel />
    </Route>
  </Router>
);
