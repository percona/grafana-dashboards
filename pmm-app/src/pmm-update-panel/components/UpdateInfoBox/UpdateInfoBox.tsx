import React from 'react';

import { Messages } from './UpdateInfoBox.messages';
import * as styles from './UpdateInfoBox.styles';

interface UpdateInfoBoxProps {
  upToDate?: boolean;
}

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
