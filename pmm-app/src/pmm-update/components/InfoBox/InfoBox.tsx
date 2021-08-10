import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { InfoBoxProps } from 'pmm-update/types';
import { Messages } from './InfoBox.messages';
import { getStyles } from './InfoBox.styles';
import { PMM_ADVANCED_SETTINGS_URL } from './InfoBox.constants';

export const InfoBox: FC<InfoBoxProps> = ({
  upToDate = false,
  hasNoAccess,
  updatesDisabled,
}) => {
  const styles = useStyles(getStyles);

  return (
    <section data-qa="updates-info" className={styles.infoBox}>
      {hasNoAccess ? (
        <p>{Messages.noAccess}</p>
      ) : updatesDisabled ? (
        <p>
          {Messages.updatesDisabled}
          <a className={styles.link} href={PMM_ADVANCED_SETTINGS_URL}>
            {Messages.pmmSettings}
          </a>
        </p>
      ) : upToDate ? (
        <p>{Messages.upToDate}</p>
      ) : (
        <>
          <p>{Messages.noUpdates}</p>
          <p>{Messages.updatesNotice}</p>
        </>
      )}
    </section>
  );
};
