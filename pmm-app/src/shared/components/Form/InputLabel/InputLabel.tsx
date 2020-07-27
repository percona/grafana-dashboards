import React, { FC, forwardRef } from 'react';
import { cx } from 'emotion';
import { useTheme } from '@grafana/ui';
import { getStyles } from './InputLabel.style';

type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const InputLabel: FC<InputLabelProps> = forwardRef<HTMLLabelElement, InputLabelProps>(({
  children,
  className,
  ...props
}, ref) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <label ref={ref} className={cx(styles.inputLabel, className)} {...props}>{children}</label>
  );
});
