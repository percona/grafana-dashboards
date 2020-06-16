import React from 'react';

import { Messages } from './UpdateModalHeader.messages';

export const UpdateModalHeader = ({ isUpdated, updateFailed, errorMessage }) => (
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
