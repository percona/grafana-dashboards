import React, { FC } from 'react';
import {
  Icon,
  LinkButton,
  Tooltip,
  useTheme
} from '@grafana/ui';
import { getStyles } from './Diagnostics.styles';
import { Messages } from '../../Settings.messages';

export const Diagnostics: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { diagnostics: { action, label, tooltip } } = Messages;

  return (
    <div className={styles.diagnosticsWrapper}>
      <div
        className={styles.diagnosticsLabel}
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
        icon={'fa fa-download' as any}
        href="/logs.zip"
        className={styles.diagnosticsButton}
        data-qa="diagnostics-button"
      >
        {action}
      </LinkButton>
    </div>
  );
};
