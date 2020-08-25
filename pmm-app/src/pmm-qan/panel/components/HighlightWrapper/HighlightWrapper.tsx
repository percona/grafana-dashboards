import React from 'react';
import Highlight from 'react-highlight.js';
import { useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { getStyles } from './HighlightWrapper.styles';

export const HighlightWrapper = (props) => {
  const { className, children, restProps } = props;
  const theme = useTheme();
  const styles = getStyles(theme);

  return <Highlight {...restProps} className={cx(className, styles.highlightWrapper)}>{children}</Highlight>;
};
