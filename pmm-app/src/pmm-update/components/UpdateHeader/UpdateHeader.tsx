import React from 'react';

import { useToggleOnAltClick } from 'pmm-update/hooks';
import * as styles from './UpdateHeader.styles';

interface LastCheckProps {
  currentReleaseDate: string;
  fullVersion: string;
  version: string;
}

export const UpdateHeader = ({ currentReleaseDate, fullVersion, version }: LastCheckProps) => {
  const [showFullVersion, handleToggleShowFullVersion] = useToggleOnAltClick(false);

  return (
    <header className={styles.updateHeader}>
      <p onClick={handleToggleShowFullVersion}>
        Current version:{' '}
        <span>
          {showFullVersion ? fullVersion : version} <em>{currentReleaseDate}</em>
        </span>
      </p>
    </header>
  );
};
