import React, { FC } from 'react';

import { UpdateModalHeaderProps } from 'pmm-update/types';
import { Messages } from './UpdateModalHeader.messages';

export const UpdateModalHeader: FC<UpdateModalHeaderProps> = ({
  errorMessage = '',
  isUpdated = false,
  updateFailed = false,
}) => (
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
