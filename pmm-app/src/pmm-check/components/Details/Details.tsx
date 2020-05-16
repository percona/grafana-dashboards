import React, { FC } from 'react';
import * as styles from './Details.styles';

interface DetailsProps {
  details: string[];
}

export const Details: FC<DetailsProps> = ({ details }) => {
  return (
    <ul className={styles.List}>
      {details.map(detail => (
        <li key={detail}>
          <span className={styles.Disk}>&#8858;</span>
          {detail}
        </li>
      ))}
    </ul>
  );
};
