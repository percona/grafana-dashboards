import React from 'react';
import ReactHighlight from 'react-highlight.js';
import { useTheme } from '@grafana/ui';
import { cx } from '@emotion/css';
import { getStyles } from './Highlight.styles';

export const Highlight = (props) => {
  const { className, children, restProps } = props;
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <ReactHighlight {...restProps} className={cx(className, styles.highlightWrapper)}>
      {children}
    </ReactHighlight>
  );
};
