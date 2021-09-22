import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { InfoBoxProps } from 'pmm-update/types';
import { Messages } from './InfoBox.messages';
import { getStyles } from './InfoBox.styles';
import { PMM_ADVANCED_SETTINGS_URL } from './InfoBox.constants';

const UpdateInfo: FC = ({ children }) => {
  const styles = useStyles(getStyles);

  return (
    <section data-testid="updates-info" className={styles.infoBox}>
      {children}
    </section>
  );
};

export const InfoBox: FC<InfoBoxProps> = ({
  upToDate = false,
  hasNoAccess,
  updatesDisabled,
  isOnline = true,
}) => {
  const styles = useStyles(getStyles);

  if (hasNoAccess) {
    return (
      <UpdateInfo>
        <p>{Messages.noAccess}</p>
      </UpdateInfo>
    );
  }

  if (!isOnline) {
    return (
      <UpdateInfo>
        <p>{Messages.notOnline}</p>
      </UpdateInfo>
    );
  }

  if (updatesDisabled) {
    return (
      <UpdateInfo>
        <p>
          {Messages.updatesDisabled}
          <a className={styles.link} href={PMM_ADVANCED_SETTINGS_URL}>
            {Messages.pmmSettings}
          </a>
        </p>
      </UpdateInfo>
    );
  }

  if (upToDate) {
    return (
      <UpdateInfo>
        <p>{Messages.upToDate}</p>
      </UpdateInfo>
    );
  }

  return (
    <UpdateInfo>
      <p>{Messages.noUpdates}</p>
      <p>{Messages.updatesNotice}</p>
    </UpdateInfo>
  );
};
