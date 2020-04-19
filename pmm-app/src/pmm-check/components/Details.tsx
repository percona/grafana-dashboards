import React from 'react';
import { css } from 'emotion';
import cx from 'classnames';

const List = css`
  list-style-type: none;
`;

const Disk = css`
  font-size: 1em;
  padding-right: 0.5em;
`;

export const Details = (details: string[]) => {
  return (
    <ul className={cx('bullet-list', List)}>
      {details.map(detail => (
        <li key={detail}>
          <span className={Disk}>&#8858;</span>
          {detail}
        </li>
      ))}
    </ul>
  );
};
