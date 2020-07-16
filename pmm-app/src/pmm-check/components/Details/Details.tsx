import React, { FC } from 'react';
import { Button } from '@grafana/ui';
import * as styles from './Details.styles';

interface DetailsProps {
  details: string[];
}

export const Details: FC<DetailsProps> = ({ details }) => {
  const silenceAlert = async () => {
  };

  return (
    <ul className={styles.List}>
      {details.reverse().map((detail) => (
        <li key={detail} className={styles.ListItem}>
          {detail}
          <Button className={styles.SilenceButton} variant="secondary" size="sm" onClick={() => silenceAlert()}>
            Silence
          </Button>
        </li>
      ))}
    </ul>
  );
};
