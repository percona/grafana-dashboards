import React, { FC } from 'react';
import { IconButton } from '@grafana/ui';
import { Dropdown } from '@percona/platform-core';
import { MultipleActionsProps } from './MultipleActions.types';

export const MultipleActions: FC<MultipleActionsProps> = ({ actions, disabled, dataQa }) => {
  const Toggle = React.forwardRef<HTMLButtonElement>((props, ref) => (
    <IconButton
      name="ellipsis-v"
      size="xl"
      disabled={disabled}
      data-qa={dataQa}
      ref={ref}
      {...props}
    />
  ));

  return (
    <Dropdown toggle={Toggle}>
      {actions.map(({ title, action }) => <span key={title} onClick={action}>{title}</span>)}
    </Dropdown>
  );
};
