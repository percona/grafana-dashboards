import React from 'react';
import { Button, ButtonProps } from '@grafana/ui';

import * as styles from './CenteredButton.styles';

export const CenteredButton = ({ children, className, ...props }: ButtonProps) => (
  <Button className={`${className} ${styles.centeredButton}`} {...props}>
    {children}
  </Button>
);
