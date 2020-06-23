import React, { FC } from 'react';

import { UpdateInfoBoxProps } from 'pmm-update/types';
import { Messages } from './UpdateInfoBox.messages';
import * as styles from './UpdateInfoBox.styles';

export const UpdateInfoBox: FC<UpdateInfoBoxProps> = ({ upToDate = false }) => {
  return (
    <section className={styles.updateInfoBox}>
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
