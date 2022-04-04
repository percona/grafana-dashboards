import React from 'react';
import SimpleBar from 'simplebar-react';
import { cx } from '@emotion/css';
import { styles } from './Scrollbar.styles';
import 'simplebar-react/dist/simplebar.min.css';

export const Scrollbar = (props) => {
  const { children, ...restProps } = props;

  return (
    <SimpleBar {...restProps} className={cx(restProps.className, styles.scrollbar)}>
      {children}
    </SimpleBar>
  );
};
