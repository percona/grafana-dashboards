import React, { FC } from 'react';
import { Icon, Tooltip, useStyles } from '@grafana/ui';
import { CurrentVersionProps } from 'pmm-update/types';
import { useToggleOnAltClick } from 'pmm-update/hooks';
import { getStyles } from './CurrentVersion.styles';
import { Messages } from './CurrentVersion.messages';

export const CurrentVersion: FC<CurrentVersionProps> = ({ installedVersionDetails }) => {
  const styles = useStyles(getStyles);
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
            {!!installedVersionDate && (
              <>
                (
                {installedVersionDate}
                )
                <Tooltip
                  content={Messages.tooltip}
                  data-testid="update-built-date-info"
                >
                  <Icon name="info-circle" className={styles.infoIcon} />
                </Tooltip>
              </>
            )}
          </span>
        </span>
      </p>
    </section>
  );
};
