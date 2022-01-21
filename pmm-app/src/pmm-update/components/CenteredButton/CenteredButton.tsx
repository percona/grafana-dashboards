import React, { FC } from 'react';
import { cx } from '@emotion/css';
import { Button } from '@grafana/ui';
import { ButtonProps } from '@grafana/ui/components/Button';
import * as styles from './CenteredButton.styles';

export const CenteredButton: FC<ButtonProps> = ({ children, className, ...props }) => (
  <Button className={cx(className, styles.centeredButton)} {...props}>
    {children}
  </Button>
);
