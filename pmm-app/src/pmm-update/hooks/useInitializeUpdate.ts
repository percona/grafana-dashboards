import { useState } from 'react';

import { startUpdate } from 'pmm-update/UpdatePanel.service';
import { UpdateInitialization } from 'pmm-update/types';

export const useInitializeUpdate = (): UpdateInitialization => {
  const [updateFailed, setUpdateFailed] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [initialLogOffset, setInitialLogOffset] = useState(0);

  const launchUpdate = async () => {
    try {
      const data = await startUpdate();

      if (!data) {
        throw Error('Invalid response received');
      }

      const { auth_token, log_offset } = data;

      setAuthToken(auth_token);
      setInitialLogOffset(log_offset);
    } catch (e) {
      setUpdateFailed(true);
      console.error(e);
    }
  };

  return [authToken, initialLogOffset, updateFailed, launchUpdate];
};
