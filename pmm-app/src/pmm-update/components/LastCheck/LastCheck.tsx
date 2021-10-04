import React, { FC } from 'react';
import { Button } from '@grafana/ui';

import { LastCheckProps } from 'pmm-update/types';
import * as styles from './LastCheck.styles';

export const LastCheck: FC<LastCheckProps> = ({ lastCheckDate, onCheckForUpdates, disabled = false }) => (
  <div className={styles.lastCheck}>
    <p>
      Last check:
      {' '}
      <span data-testid="update-last-check">{lastCheckDate}</span>
    </p>
    <Button
      data-testid="update-last-check-button"
      variant="link"
      size="sm"
      onClick={onCheckForUpdates}
      icon={'fa fa-refresh' as any}
      disabled={disabled}
    />
  </div>
);
