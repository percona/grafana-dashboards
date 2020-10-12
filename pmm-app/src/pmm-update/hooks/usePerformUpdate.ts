import { useEffect, useState } from 'react';

import { getUpdateStatus } from 'pmm-update/UpdatePanel.service';
import { UpdateStatus } from 'pmm-update/types';
import { useInitializeUpdate } from './useInitializeUpdate';

export const usePerformUpdate = (): UpdateStatus => {
  const [updateFailed, setUpdateFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [output, setOutput] = useState('');
  const [updateFinished, setUpdateFinished] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>();

  const [authToken, initialLogOffset, initializationFailed, launchUpdate] = useInitializeUpdate();

  useEffect(() => {
    if (!authToken || initialLogOffset === undefined) {
      return;
    }

    const updateStatus = async (logOffset: number, errorsCount = 0) => {
      // Set the errorCount high enough to make it possible for the user to find the error
      if (errorsCount > 600 || initializationFailed) {
        setUpdateFailed(true);

        return;
      }

      let newErrorsCount = errorsCount;
      let newLogOffset = logOffset;
      let newIsUpdated = false;

      try {
        const response = await getUpdateStatus({ auth_token: authToken, log_offset: logOffset });

        if (!response) {
          throw Error('Invalid response received');
        }

        const { done, log_offset, log_lines } = response;

        setOutput((previousOutput) => {
          const logLines = log_lines ?? [];

          return `${previousOutput}${logLines.join('\n')}\n`;
        });
        newLogOffset = log_offset ?? 0;
        newErrorsCount = 0;
        newIsUpdated = done ?? false;
      } catch (e) {
        newErrorsCount += 1;
        setErrorMessage(e.message);
      } finally {
        if (newIsUpdated) {
          setUpdateFinished(newIsUpdated);
        } else {
          const timeout = setTimeout(updateStatus, 500, newLogOffset, newErrorsCount);

          setTimeoutId(timeout);
        }
      }
    };

    updateStatus(initialLogOffset, 0);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timeoutId);
    };
  }, [authToken, initialLogOffset]);

  useEffect(() => {
    setUpdateFailed(initializationFailed);
  }, [initializationFailed]);

  return [output, errorMessage, updateFinished, updateFailed, launchUpdate];
};
