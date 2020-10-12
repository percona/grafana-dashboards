import React, { FC } from 'react';
import { Button } from '@grafana/ui';
import { AddClusterButtonProps } from './AddClusterButton.types';

export const AddClusterButton: FC<AddClusterButtonProps> = ({
  label,
  action,
  ...props
}) => (
  <Button
    size="md"
    onClick={action}
    icon="plus-square"
    variant="link"
    {...props}
  >
    {label}
  </Button>
);
