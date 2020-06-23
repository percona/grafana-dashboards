import React, { MouseEvent } from 'react';
import { Button, Spinner } from '@grafana/ui';

import * as styles from './LastCheck.styles';

interface LastCheckProps {
  onCheckForUpdates: (e: MouseEvent) => void;
  isLoading: boolean;
  lastCheckDate: string;
}

export const LastCheck = ({ isLoading, lastCheckDate, onCheckForUpdates }: LastCheckProps) => {
  const icon = 'fa fa-refresh';

  return (
    <div className={styles.lastCheck}>
      <p>Last check: {lastCheckDate}</p>
      {isLoading ? (
        <Spinner iconClassName={icon} />
      ) : (
        <Button variant="link" size="sm" onClick={onCheckForUpdates} icon={icon}></Button>
      )}
    </div>
  );
};
