import React, { FC } from 'react';

import { CurrentVersionProps } from 'pmm-update/types';
import { useToggleOnAltClick } from 'pmm-update/hooks';
import * as styles from './CurrentVersion.styles';
import { Messages } from './CurrentVersion.messages';

export const CurrentVersion: FC<CurrentVersionProps> = ({ installedVersionDetails }) => {
  const [showFullVersion, handleToggleShowFullVersion] = useToggleOnAltClick(false);

  const { installedVersionDate, installedVersion, installedFullVersion } = installedVersionDetails;

  return (
    <section className={styles.currentVersion}>
      <p onClick={handleToggleShowFullVersion}>
        {Messages.currentVersion}
        :
        {' '}
        <span>
          <span data-testid="update-installed-version">
            {showFullVersion ? installedFullVersion : installedVersion}
          </span>
          {' '}
          <span data-testid="update-installed-release-date" className={styles.releaseDate}>
            {!!installedVersionDate && `(${Messages.built} ${installedVersionDate})`}
          </span>
        </span>
      </p>
    </section>
  );
};
