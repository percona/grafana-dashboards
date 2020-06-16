import React from 'react';
import { cx } from 'emotion';
import { Button, ButtonProps } from '@grafana/ui';

import * as styles from './CenteredButton.styles';

export const CenteredButton = ({ children, className, ...props }: ButtonProps) => (
  <Button className={cx(className, styles.centeredButton)} {...props}>
    {children}
  </Button>
);
