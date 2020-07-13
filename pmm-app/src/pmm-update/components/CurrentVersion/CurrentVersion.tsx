import React, { FC } from 'react';

import { CurrentVersionProps } from 'pmm-update/types';
import { useToggleOnAltClick } from 'pmm-update/hooks';
import * as styles from './CurrentVersion.styles';

export const CurrentVersion: FC<CurrentVersionProps> = ({ installedVersionDetails }) => {
  const [showFullVersion, handleToggleShowFullVersion] = useToggleOnAltClick(false);

  const { installedVersionDate, installedVersion, installedFullVersion } = installedVersionDetails;

  return (
    <section className={styles.currentVersion}>
      <p onClick={handleToggleShowFullVersion}>
        Current version:
        {' '}
        <span>
          <span data-qa="update-installed-version">
            {showFullVersion ? installedFullVersion : installedVersion}
          </span>
          {' '}
          <span data-qa="update-installed-release-date" className={styles.releaseDate}>
            (
            {installedVersionDate}
            )
          </span>
        </span>
      </p>
    </section>
  );
};
