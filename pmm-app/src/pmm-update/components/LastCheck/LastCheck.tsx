import React, { FC } from 'react';
import { Button, Spinner } from '@grafana/ui';

import { LastCheckProps } from 'pmm-update/types';
import * as styles from './LastCheck.styles';

export const LastCheck: FC<LastCheckProps> = ({ lastCheckDate, onCheckForUpdates, isLoading = false }) => (
  <div className={styles.lastCheck}>
    <p>Last check: {lastCheckDate}</p>
    {isLoading ? (
      <Spinner />
    ) : (
      <Button variant="link" size="sm" onClick={onCheckForUpdates} icon="fa fa-refresh"></Button>
    )}
  </div>
);
