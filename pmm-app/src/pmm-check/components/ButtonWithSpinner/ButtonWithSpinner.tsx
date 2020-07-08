import React, { FC } from 'react';
import { Button, ButtonProps, Spinner } from '@grafana/ui';

import * as styles from './ButtonWithSpinner.styles';

interface ButtonWithSpinnerProps extends ButtonProps {
  isLoading?: boolean;
}

export const ButtonWithSpinner: FC<ButtonWithSpinnerProps> = ({
  children,
  disabled,
  isLoading = false,
  ...props
}) => (
  <Button className={styles.Button} variant="secondary" size="md" disabled={isLoading || disabled} {...props}>
    {isLoading ? <Spinner /> : children}
  </Button>
);
