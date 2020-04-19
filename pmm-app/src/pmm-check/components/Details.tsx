import React from 'react';
import cx from 'classnames';
import * as styles from './Details.styles';

export const Details = (details: string[]) => {
  return (
    <ul className={cx('bullet-list', styles.List)}>
      {details.map(detail => (
        <li key={detail}>
          <span className={styles.Disk}>&#8858;</span>
          {detail}
        </li>
      ))}
    </ul>
  );
};
