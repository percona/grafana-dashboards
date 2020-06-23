import React from 'react';

import { UpdateHeaderProps } from 'pmm-update/types';
import { useToggleOnAltClick } from 'pmm-update/hooks';
import * as styles from './UpdateHeader.styles';

export const UpdateHeader = ({ currentReleaseDate, fullVersion, version }: UpdateHeaderProps) => {
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
