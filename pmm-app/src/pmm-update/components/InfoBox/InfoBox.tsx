import React, { FC } from 'react';

import { InfoBoxProps } from 'pmm-update/types';
import { Messages } from './InfoBox.messages';
import * as styles from './InfoBox.styles';

export const InfoBox: FC<InfoBoxProps> = ({ upToDate = false }) => {
  return (
    <section className={styles.infoBox}>
      {upToDate ? (
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
