import React, { MouseEvent } from 'react';
import { Button } from '@grafana/ui';

import * as styles from './LastCheck.styles';

interface LastCheckProps {
  onCheckForUpdates: (e: MouseEvent) => void;
  isLoading: boolean;
  lastCheckDate: string;
}

export const LastCheck = ({ isLoading, lastCheckDate, onCheckForUpdates }: LastCheckProps) => {
  const icon = `fa ${isLoading ? 'fa-spin ' : ''}fa-refresh`;

  return (
    <div className={styles.lastCheck}>
      <p>Last check: {lastCheckDate}</p>
      <Button variant="link" size="sm" onClick={onCheckForUpdates} icon={icon}></Button>
    </div>
  );
};
