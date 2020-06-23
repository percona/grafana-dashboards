import React from 'react';

import { UpdateModalHeaderProps } from 'pmm-update/types';
import { Messages } from './UpdateModalHeader.messages';

export const UpdateModalHeader = ({
  errorMessage = '',
  isUpdated = false,
  updateFailed = false,
}: UpdateModalHeaderProps) => (
  <>
    {isUpdated ? (
      <h4>{Messages.updateSucceeded}</h4>
    ) : !updateFailed ? (
      <h4>{Messages.updateInProgress}</h4>
    ) : (
      <>
        <h4>{Messages.updateFailed}</h4>
        <h4>{errorMessage}</h4>
      </>
    )}
  </>
);
