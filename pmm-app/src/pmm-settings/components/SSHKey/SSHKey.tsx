import React, { FC, useState } from 'react';
import { Button, Spinner, useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { Messages } from 'pmm-settings/Settings.messages';
import { GUI_DOC_URL } from 'pmm-settings/Settings.constants';
import { LoadingCallback } from 'pmm-settings/Settings.service';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { getStyles } from './SSHKey.styles';

export interface SSHKeyProps {
  sshKey: string;
  updateSettings: (body: any, callback: LoadingCallback) => void;
}

export const SSHKey: FC<SSHKeyProps> = ({ sshKey, updateSettings }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const settingsStyles = getSettingsStyles(theme);
  const { ssh: { action, label, tooltip }, tooltipLinkText } = Messages;
  const [key, setKey] = useState(sshKey);
  const [loading, setLoading] = useState(false);

  const applyChanges = () => {
    const body = { ssh_key: key };

    updateSettings(body, setLoading);
  };

  return (
    <div className={styles.sshKeyWrapper}>
      <div className={settingsStyles.labelWrapper}>
        <span>{label}</span>
        <LinkTooltip
          tooltipText={tooltip}
          link={`${GUI_DOC_URL}#ssh-key-details`}
          linkText={tooltipLinkText}
          icon="info-circle"
        />
      </div>
      <textarea
        className={cx(settingsStyles.textarea, styles.textarea)}
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <Button
        className={settingsStyles.actionButton}
        variant="secondary"
        disabled={sshKey === key || loading}
        onClick={applyChanges}
      >
        {loading && <Spinner />}
        {action}
      </Button>
    </div>
  );
};
