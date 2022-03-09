import React from 'react';
import { cx } from '@emotion/css';

export const Scrollbar = (props) => {
  const { children, ...restProps } = props;

  return (
    <div {...restProps} className={cx(restProps.className)}>
      {children}
    </div>
  );
};
