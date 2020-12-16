import React, { FC, useMemo, useState } from 'react';
import { Tab, TabContent, TabsBar, useTheme } from '@grafana/ui';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { Messages } from 'pmm-settings/Settings.messages';
import validators from 'shared/components/helpers/validators';
import { getStyles } from './Advanced.styles';
import { transformSecondsToDays } from './Advanced.utils';
import { MAX_DAYS, MIN_DAYS, SECONDS_IN_DAY } from './Advanced.constants';
import { AdvancedProps } from './Advanced.types';
import { Email } from './Email/Email';
import { Field, Form } from 'react-final-form';
import { cx } from 'emotion';
import { Slack } from './Slack/Slack';

export const Communication: FC<AdvancedProps> = ({
  dataRetention,
  telemetryEnabled,
  updatesDisabled,
  sttEnabled,
  dbaasEnabled,
  publicAddress,
  updateSettings,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const settingsStyles = getSettingsStyles(theme);
  const {
    advanced: {
      action,
      retentionLabel,
      retentionTooltip,
      retentionUnits,
      telemetryLabel,
      telemetryLink,
      telemetryTooltip,
      updatesLabel,
      updatesLink,
      updatesTooltip,
      sttLabel,
      sttLink,
      sttTooltip,
      dbaasLabel,
      dbaasTooltip,
      publicAddressLabel,
      publicAddressTooltip,
      publicAddressButton,
    },
    tooltipLinkText,
  } = Messages;
  const initialValues = {
    retention: transformSecondsToDays(dataRetention),
    telemetry: telemetryEnabled,
    updates: !updatesDisabled,
    stt: sttEnabled,
    dbaas: dbaasEnabled,
    publicAddress,
  };
  const [loading, setLoading] = useState(false);
  const retentionValidators = validators.compose(
    validators.required,
    validators.range(MIN_DAYS, MAX_DAYS),
  );
  const applyChanges = ({ retention, telemetry, stt, publicAddress }) => {
    const body = {
      data_retention: `${+retention * SECONDS_IN_DAY}s`,
      disable_telemetry: !telemetry,
      enable_telemetry: telemetry,
      disable_stt: !stt,
      enable_stt: stt,
      pmm_public_address: publicAddress,
      remove_pmm_public_address: !publicAddress,
    };

    updateSettings(body, setLoading);
  };

  const [activeTab, setActiveTab] = useState('email');

  const tabs = useMemo(
    () => [
      { label: 'Email', key: 'email', active: activeTab === 'email', component: <Email /> },
      { label: 'Slack', key: 'slack', active: activeTab === 'slack', component: <Slack /> },
    ],
    [],
  );

  return (
    <div className={cx(settingsStyles.wrapper)}>
      <TabsBar>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            active={tab.key === activeTab}
            // style={tab.disabled ? styles.disabled : undefined}
            onChangeTab={() => setActiveTab(tab.key)}
          />
        ))}
      </TabsBar>
      <TabContent>{tabs.map((tab) => tab.key === activeTab && tab.component)}</TabContent>
    </div>
  );
};
