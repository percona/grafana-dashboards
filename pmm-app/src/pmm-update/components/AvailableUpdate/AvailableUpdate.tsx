import React, { FC } from 'react';
import { LinkButton } from '@grafana/ui';

import { AvailableUpdateProps } from 'pmm-update/types';
import { useToggleOnAltClick } from 'pmm-update/hooks';
import { Messages } from './AvailableUpdate.messages';
import * as styles from './AvailableUpdate.styles';

export const AvailableUpdate: FC<AvailableUpdateProps> = ({ nextVersionDetails }) => {
  const [showFullVersion, handleToggleShowFullVersion] = useToggleOnAltClick(false);

  const { nextVersionDate, nextVersion, nextFullVersion, newsLink } = nextVersionDetails;

  return (
    <section className={styles.availableUpdate}>
      <div onClick={handleToggleShowFullVersion}>
        <p>{Messages.availableVersion}:&nbsp;</p>
        <p className={styles.availableUpdate_version}>
          {showFullVersion ? nextFullVersion : nextVersion} <em>{nextVersionDate}</em>
          {newsLink && (
            <>
              {' '}
              <LinkButton rel="noreferrer" href={newsLink} target="_blank" variant="link">
                {Messages.whatsNew}
              </LinkButton>
            </>
          )}
        </p>
      </div>
    </section>
  );
};
