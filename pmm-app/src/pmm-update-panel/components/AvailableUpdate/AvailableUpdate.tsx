import React, { MouseEvent } from 'react';

import { Messages } from './AvailableUpdate.messages';
import * as styles from './AvailableUpdate.style';

interface AvailableUpdateProps {
  onShowFullAvailableVersion: (e: MouseEvent) => void;
  newReleaseDate: string;
  newsLink: string;
  nextVersion: string;
}

export const AvailableUpdate = ({
  onShowFullAvailableVersion,
  newReleaseDate,
  newsLink,
  nextVersion,
}: AvailableUpdateProps) => {
  return (
    <section className={styles.availableUpdate}>
      <div onClick={onShowFullAvailableVersion}>
        <p>{Messages.availableVersion}:&nbsp;</p>
        <div className="version">
          <p>
            {nextVersion} <em>{newReleaseDate}</em>
            {newsLink && (
              <a href={newsLink} rel="noreferrer" target="_blank">
                {Messages.whatsNew}
              </a>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};
