import React, { FC } from 'react';
import {
  Icon,
  LinkButton,
  Tooltip,
  useTheme
} from '@grafana/ui';
import { Messages } from 'pmm-settings/Settings.messages';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { Download } from 'shared/components/Elements/Icons/Download';
import { getStyles } from './Diagnostics.styles';

export const Diagnostics: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const settingsStyles = getSettingsStyles(theme);
  const { diagnostics: { action, label, tooltip } } = Messages;

  return (
    <div className={styles.diagnosticsWrapper}>
      <div
        className={settingsStyles.labelWrapper}
        data-qa="diagnostics-label"
      >
        {label}
        <Tooltip content={tooltip}>
          <div>
            <Icon name="info-circle" />
          </div>
        </Tooltip>
      </div>
      <LinkButton
        href="/logs.zip"
        className={styles.diagnosticsButton}
        data-qa="diagnostics-button"
      >
        <Download />
        <span>{action}</span>
      </LinkButton>
    </div>
  );
};
