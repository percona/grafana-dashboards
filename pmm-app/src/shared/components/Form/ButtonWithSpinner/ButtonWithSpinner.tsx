import React, { FC } from 'react';
import { cx } from 'emotion';
import { Button, ButtonProps, Spinner } from '@grafana/ui';

import * as styles from './ButtonWithSpinner.styles';

interface ButtonWithSpinnerProps extends ButtonProps {
  isLoading?: boolean;
}

export const ButtonWithSpinner: FC<ButtonWithSpinnerProps> = ({
  children,
  disabled,
  className = '',
  isLoading = false,
  ...props
}) => (
  <Button className={cx(styles.Button, className)} size="md" disabled={isLoading || disabled} {...props}>
    {isLoading ? <Spinner /> : children}
  </Button>
);
