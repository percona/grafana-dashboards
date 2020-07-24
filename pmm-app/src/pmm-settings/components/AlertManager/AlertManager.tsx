import React, { FC, useState } from 'react';
import { Button, Spinner, useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { Messages } from 'pmm-settings/Settings.messages';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { getStyles } from './AlertManager.styles';
import { AlertManagerProps } from './AlertManager.types';

export const AlertManager: FC<AlertManagerProps> = ({
  alertManagerUrl,
  alertManagerRules,
  updateSettings
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const settingsStyles = getSettingsStyles(theme);
  const {
    alertmanager: {
      action,
      rulesLabel,
      rulesLink,
      rulesTooltip,
      urlLabel,
      urlLink,
      urlTooltip
    },
    tooltipLinkText
  } = Messages;
  const [url, setUrl] = useState(alertManagerUrl);
  const [rules, setRules] = useState(alertManagerRules);
  const [loading, setLoading] = useState(false);
  const isActionDisabled = () => (
    url === alertManagerUrl
    && rules === alertManagerRules
  );
  const applyChanges = () => {
    const body: any = {
      alert_manager_url: url,
      alert_manager_rules: rules
    };

    if (!url) {
      body.remove_alert_manager_url = true;
    }

    if (!rules) {
      body.remove_alert_manager_rules = true;
    }

    updateSettings(body, setLoading);
  };

  return (
    <div className={styles.alertManagerWrapper}>
      <div className={settingsStyles.labelWrapper}>
        <span>{urlLabel}</span>
        <LinkTooltip
          tooltipText={urlTooltip}
          link={urlLink}
          linkText={tooltipLinkText}
          icon="info-circle"
        />
      </div>
      <input
        className={cx(settingsStyles.input, styles.input)}
        value={url}
        data-qa="alertmanager-url"
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className={cx(settingsStyles.labelWrapper, styles.rulesLabel)}>
        <span>{rulesLabel}</span>
        <LinkTooltip
          tooltipText={rulesTooltip}
          link={rulesLink}
          linkText={tooltipLinkText}
          icon="info-circle"
        />
      </div>
      <textarea
        className={cx(settingsStyles.textarea, styles.textarea)}
        value={rules}
        data-qa="alertmanager-rules"
        onChange={(e) => setRules(e.target.value)}
      />
      <Button
        className={settingsStyles.actionButton}
        variant="secondary"
        disabled={isActionDisabled() || loading}
        onClick={applyChanges}
      >
        {loading && <Spinner />}
        {action}
      </Button>
    </div>
  );
};
