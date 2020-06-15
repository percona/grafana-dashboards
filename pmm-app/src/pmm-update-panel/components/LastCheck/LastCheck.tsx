import React, { MouseEvent } from 'react';

import * as styles from './LastCheck.styles';

interface LastCheckProps {
  onCheckForUpdates: (e: MouseEvent) => void;
  isLoading: boolean;
  lastCheckDate: string;
}

export const LastCheck = ({ isLoading, lastCheckDate, onCheckForUpdates }: LastCheckProps) => (
  <div className={styles.lastCheck}>
    <p>Last check: {lastCheckDate}</p>
    <button onClick={onCheckForUpdates}>
      <i className={`fa ${isLoading ? 'fa-spin ' : ''}fa-refresh`}></i>
    </button>
  </div>
);
