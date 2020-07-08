import React, { FC } from 'react';
import { Button, ButtonProps, Spinner } from '@grafana/ui';

import * as styles from './ButtonWithSpinner.styles';

interface ButtonWithSpinnerProps extends ButtonProps {
  isLoading?: boolean;
}

export const ButtonWithSpinner: FC<ButtonWithSpinnerProps> = ({ children, isLoading = false, ...props }) => (
  <Button className={styles.Button} variant="secondary" size="md" {...props}>
    {isLoading ? <Spinner /> : children}
  </Button>
);
