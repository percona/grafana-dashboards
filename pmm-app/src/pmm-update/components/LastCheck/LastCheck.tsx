import React, { MouseEvent } from 'react';
import { Button, Spinner } from '@grafana/ui';

import * as styles from './LastCheck.styles';

interface LastCheckProps {
  lastCheckDate: string;
  onCheckForUpdates: (e: MouseEvent) => void;
  isLoading?: boolean;
}

export const LastCheck = ({ lastCheckDate, onCheckForUpdates, isLoading = false }: LastCheckProps) => {
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
