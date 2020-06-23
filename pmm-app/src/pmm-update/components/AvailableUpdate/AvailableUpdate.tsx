import React from 'react';

import { AvailableUpdateProps } from 'pmm-update/types';
import { useToggleOnAltClick } from 'pmm-update/hooks';
import { Messages } from './AvailableUpdate.messages';
import * as styles from './AvailableUpdate.styles';

export const AvailableUpdate = ({
  newReleaseDate,
  newsLink,
  nextFullVersion,
  nextVersion,
}: AvailableUpdateProps) => {
  const [showFullVersion, handleToggleShowFullVersion] = useToggleOnAltClick(false);

  return (
    <section className={styles.availableUpdate}>
      <div onClick={handleToggleShowFullVersion}>
        <p>{Messages.availableVersion}:&nbsp;</p>
        <p className={styles.availableUpdate_version}>
          {showFullVersion ? nextFullVersion : nextVersion} <em>{newReleaseDate}</em>
          {newsLink && (
            <>
              {' '}
              <a href={newsLink} rel="noreferrer" target="_blank">
                {Messages.whatsNew}
              </a>
            </>
          )}
        </p>
      </div>
    </section>
  );
};
