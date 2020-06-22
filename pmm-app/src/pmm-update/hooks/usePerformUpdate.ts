import { useEffect, useState } from 'react';

import { startUpdate, getUpdateStatus } from 'pmm-update/UpdatePanel.service';

const useInitializeUpdate = () => {
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

  return { authToken, logOffset, updateFailed, initializeUpdate };
};

export const usePerformUpdate = (): [string, string, boolean, boolean, () => void] => {
  const [updateFailed, setUpdateFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [output, setOutput] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>();

  const {
    authToken,
    logOffset,
    updateFailed: initializationFailed,
    initializeUpdate: launchUpdate,
  } = useInitializeUpdate();

  useEffect(() => {
    if (!authToken || typeof logOffset === 'undefined') {
      return;
    }

    const updateStatus = async (logOffset: number, errorsCount = 0) => {
      if (errorsCount > 600) {
        setUpdateFailed(true);
        return;
      }

      let newErrorsCount = errorsCount;
      let newLogOffset = logOffset;

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
        const updated = done ?? false;
        if (updated) {
          setIsUpdated(updated);
          return;
        }
      } catch (e) {
        newErrorsCount += 1;
        setErrorMessage(e.message);
      } finally {
        const timeout = setTimeout(updateStatus, 500, newLogOffset, newErrorsCount);
        setTimeoutId(timeout);
      }
    };

    updateStatus(logOffset, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [authToken, logOffset]);

  useEffect(() => {
    setUpdateFailed(true);
  }, [initializationFailed]);

  return [output, errorMessage, isUpdated, updateFailed, launchUpdate];
};
