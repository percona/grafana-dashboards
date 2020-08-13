import React, { FC, useState } from 'react';
import { cx } from 'emotion';
import {
  Button, Spinner, TextArea, useTheme
} from '@grafana/ui';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { Messages } from 'pmm-settings/Settings.messages';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { getStyles } from './SSHKey.styles';
import { SSHKeyProps } from './SSHKey.types';

export const SSHKey: FC<SSHKeyProps> = ({ sshKey, updateSettings }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const settingsStyles = getSettingsStyles(theme);
  const {
    ssh: {
      action,
      label,
      link,
      tooltip
    }, tooltipLinkText
  } = Messages;
  const [key, setKey] = useState(sshKey);
  const [loading, setLoading] = useState(false);

  const applyChanges = () => {
    const body = { ssh_key: key };

    updateSettings(body, setLoading);
  };

  return (
    <div className={cx(settingsStyles.wrapper, styles.sshKeyWrapper)}>
      <div
        className={settingsStyles.labelWrapper}
        data-qa="ssh-key-label"
      >
        <span>{label}</span>
        <LinkTooltip
          tooltipText={tooltip}
          link={link}
          linkText={tooltipLinkText}
          icon="info-circle"
        />
      </div>
      <TextArea
        className={styles.textarea}
        value={key}
        data-qa="ssh-key"
        onChange={(e: any) => setKey(e.target.value)}
      />
      <Button
        className={settingsStyles.actionButton}
        disabled={sshKey === key || loading}
        onClick={applyChanges}
        data-qa="ssh-key-button"
      >
        {loading && <Spinner />}
        {action}
      </Button>
    </div>
  );
};
