import React, { FC } from 'react';

import { UpdateHeaderProps } from 'pmm-update/types';
import { useToggleOnAltClick } from 'pmm-update/hooks';
import * as styles from './UpdateHeader.styles';

export const UpdateHeader: FC<UpdateHeaderProps> = ({ installedVersionDetails }) => {
  const [showFullVersion, handleToggleShowFullVersion] = useToggleOnAltClick(false);

  const { installedVersionDate, installedVersion, installedFullVersion } = installedVersionDetails;

  return (
    <header className={styles.updateHeader}>
      <p onClick={handleToggleShowFullVersion}>
        Current version:{' '}
        <span>
          {showFullVersion ? installedFullVersion : installedVersion} <em>{installedVersionDate}</em>
        </span>
      </p>
    </header>
  );
};
