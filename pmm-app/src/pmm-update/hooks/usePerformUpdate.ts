import { useEffect, useState } from 'react';

import { getUpdateStatus } from 'pmm-update/UpdatePanel.service';
import { UpdateStatus } from 'pmm-update/types';
import { useInitializeUpdate } from './useInitializeUpdate';

export const usePerformUpdate = (): UpdateStatus => {
  const [updateFailed, setUpdateFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [output, setOutput] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>();

  const [authToken, logOffset, initializationFailed, launchUpdate] = useInitializeUpdate();

  useEffect(() => {
    if (!authToken || typeof logOffset === 'undefined') {
      return;
    }

    const updateStatus = async (logOffset: number, errorsCount = 0, isUpdated = false) => {
      if (isUpdated) {
        setIsUpdated(isUpdated);
        return;
      }

      if (errorsCount > 600 || initializationFailed) {
        setUpdateFailed(true);
        return;
      }

      let newErrorsCount = errorsCount;
      let newLogOffset = logOffset;
      let newIsUpdated: boolean = isUpdated;

      try {
        const response = await getUpdateStatus({ auth_token: authToken, log_offset: logOffset });
        if (!response) {
          throw Error('Invalid response received');
        }
        const { done, log_offset, log_lines } = response;
        setOutput(previousOutput => {
          const logLines = log_lines ?? [];
          return `${previousOutput}${logLines.join('\n')}\n`;
        });
        newLogOffset = logOffset + log_offset ?? 0;
        newErrorsCount = 0;
        newIsUpdated = done ?? false;
      } catch (e) {
        newErrorsCount += 1;
        setErrorMessage(e.message);
      } finally {
        const timeout = setTimeout(updateStatus, 500, newLogOffset, newErrorsCount, newIsUpdated);
        setTimeoutId(timeout);
      }
    };

    updateStatus(logOffset, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [authToken, logOffset]);

  useEffect(() => {
    setUpdateFailed(initializationFailed);
  }, [initializationFailed]);

  return [output, errorMessage, isUpdated, updateFailed, launchUpdate];
};
