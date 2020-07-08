import { useState } from 'react';

import { startUpdate } from 'pmm-update/UpdatePanel.service';
import { UpdateInitialization } from 'pmm-update/types';

export const useInitializeUpdate = (): UpdateInitialization => {
  const [updateFailed, setUpdateFailed] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [logOffset, setLogOffset] = useState(0);

  const initializeUpdate = async () => {
    try {
      const data = await startUpdate();
      if (!data) {
        throw Error('Invalid response received');
      }
      const { auth_token, log_offset } = data;
      setAuthToken(auth_token);
      setLogOffset(log_offset);
    } catch (e) {
      setUpdateFailed(true);
      console.error(e);
    }
  };

  return [authToken, logOffset, updateFailed, initializeUpdate];
};
