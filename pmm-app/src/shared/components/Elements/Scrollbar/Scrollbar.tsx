import React from 'react';
import SimpleBar from 'simplebar-react';
import { cx } from 'emotion';
import { styles } from './Scrollbar.styles';
// NOTE: this is installed along with simplebar-react
// eslint-disable-next-line import/no-extraneous-dependencies
import 'simplebar-core/dist/simplebar.min.css';

export const Scrollbar = (props) => {
  const { children, ...restProps } = props;

  return (
    <SimpleBar {...restProps} className={cx(restProps.className, styles.scrollbar)}>
      {children}
    </SimpleBar>
  );
};
