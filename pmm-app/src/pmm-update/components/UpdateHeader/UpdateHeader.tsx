import React, { MouseEvent } from 'react';

import * as styles from './UpdateHeader.styles';

interface LastCheckProps {
  currentReleaseDate: string;
  onExpandVersion: (e: MouseEvent) => void;
  version: string;
}

export const UpdateHeader = ({ currentReleaseDate, onExpandVersion, version }: LastCheckProps) => (
  <header className={styles.updateHeader}>
    <p onClick={onExpandVersion}>
      Current version:{' '}
      <span>
        {version} <em>{currentReleaseDate}</em>
      </span>
    </p>
  </header>
);
