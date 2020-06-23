import React from 'react';

import { UpdateInfoBoxProps } from 'pmm-update/types';
import { Messages } from './UpdateInfoBox.messages';
import * as styles from './UpdateInfoBox.styles';

export const UpdateInfoBox = ({ upToDate = false }: UpdateInfoBoxProps) => {
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
