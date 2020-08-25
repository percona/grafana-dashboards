import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import React from 'react';
import { cx } from 'emotion';
import { styles } from './Scrollbar.styles';

export const Scrollbar = (props) => {
  const { children, ...restProps } = props;

  return (
    <SimpleBar {...restProps} className={cx(restProps.className, styles.scrollbar)}>
      {children}
    </SimpleBar>
  );
};
