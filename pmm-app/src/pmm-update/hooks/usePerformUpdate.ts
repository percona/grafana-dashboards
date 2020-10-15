import { useEffect, useState } from 'react';

import { getUpdateStatus } from 'pmm-update/UpdatePanel.service';
import { UpdateStatus } from 'pmm-update/types';
import { useInitializeUpdate } from './useInitializeUpdate';

export const usePerformUpdate = (): UpdateStatus => {
  const [updateFailed, setUpdateFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [output, setOutput] = useState('');
  const [updateFinished, setUpdateFinished] = useState(false);
  const [authToken, initialLogOffset, initializationFailed, launchUpdate] = useInitializeUpdate();

  let timeoutId: number;

  useEffect(() => {
    if (!authToken || initialLogOffset === undefined) {
      return;
    }

    let logOffset = initialLogOffset;
    let errorsCount = 0;

    const updateStatus = async () => {
      // Set the errorCount high enough to make it possible for the user to find the error
      if (errorsCount > 600 || initializationFailed) {
        setUpdateFailed(true);

        return;
      }

      let isUpdated = false;

      try {
        const response = await getUpdateStatus({ auth_token: authToken, log_offset: logOffset });

        if (!response) {
          throw Error('Invalid response received');
        }

        const { done, log_offset, log_lines } = response;

        if (logOffset !== log_offset) {
          logOffset = log_offset ?? 0;
          setOutput((previousOutput) => `${previousOutput}${(log_lines ?? []).join('\n')}\n`);
        }

        isUpdated = done ?? false;
        if (isUpdated) {
          setUpdateFinished(true);
        }
      } catch (e) {
        errorsCount += 1;
        setErrorMessage(e.message);
      } finally {
        if (!isUpdated) {
          timeoutId = window.setTimeout(updateStatus, 500);
        }
      }
    };

    updateStatus();

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeoutId);
  }, [authToken, initialLogOffset]);

  useEffect(() => {
    setUpdateFailed(initializationFailed);
  }, [initializationFailed]);

  return [output, errorMessage, updateFinished, updateFailed, launchUpdate];
};
