import React, { MouseEvent, useCallback, useEffect, useState } from 'react';

import {
  AvailableUpdate,
  LastCheck,
  UpdateButton,
  UpdateHeader,
  UpdateInfoBox,
  UpdateModal,
} from 'pmm-update/components';
import { useVersionDetails } from 'pmm-update/hooks';

import { startUpdate, getUpdateStatus } from './UpdatePanel.service';
import * as styles from './UpdatePanel.styles';

export const UpdatePanel = () => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState('');
  const [output, setOutput] = useState('');

  const [
    { installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable }, errorMessage,
    isLoading,
    isDefaultView,
    getCurrentVersionDetails
  ] = useVersionDetails()

  useEffect(() => {
    setError(errorMessage);
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [errorMessage]);

  const updateLogs = useCallback(async (authToken: string, logOffset: number, errorsCount = 0) => {
    if (errorsCount > 600) {
      setUpdateFailed(true);
      return;
    }

    let timeoutId: number | undefined;
    let newErrorsCount = errorsCount;
    let newLogOffset = logOffset;

    try {
      const data = await getUpdateStatus({ auth_token: authToken, log_offset: logOffset });
      if (!data) {
        throw Error('Invalid response received');
      }
      const { done, log_offset, log_lines } = data;
      const updated = done ?? false;
      if (updated) {
        setIsUpdated(updated);
        clearTimeout(timeoutId);
        return;
      }
      newLogOffset = logOffset + log_offset ?? 0;
      setOutput(output => `${output}${log_lines.join('\n')}\n`);
      newErrorsCount = 0;
    } catch (e) {
      newErrorsCount += 1;
      setError(e.message);
    } finally {
      timeoutId = setTimeout(updateLogs, 500, authToken, newLogOffset, newErrorsCount);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleUpdate = useCallback(async () => {
    setShowModal(true);

    try {
      const data = await startUpdate();
      if (!data) {
        throw Error('Invalid response received');
      }
      const { auth_token, log_offset } = data;
      await updateLogs(auth_token, log_offset);
    } catch (e) {
      setUpdateFailed(true);
      console.error(e);
    }
  }, [updateLogs]);

  const handleCheckForUpdates = useCallback((e: MouseEvent) => {
    if (e.altKey) {
      setForceUpdate(true);
    }

    getCurrentVersionDetails(true);
  }, []);

  return (
    <>
      <div className={styles.panel}>
        <UpdateHeader
          currentReleaseDate={installedVersionDetails?.installedVersionDate ?? ''}
          version={installedVersionDetails?.installedVersion ?? ''}
          fullVersion={installedVersionDetails?.installedFullVersion ?? ''}
        />
        {isDefaultView && <UpdateInfoBox />}
        {!isUpdateAvailable && !isDefaultView && !forceUpdate ? <UpdateInfoBox upToDate /> : null}
        {isUpdateAvailable && !isDefaultView ? (
          <AvailableUpdate
            newReleaseDate={nextVersionDetails?.nextVersionDate ?? ''}
            newsLink={nextVersionDetails?.newsLink ?? ''}
            nextVersion={nextVersionDetails?.nextVersion ?? ''}
            nextFullVersion={nextVersionDetails?.nextFullVersion ?? ''}
          />
        ) : null}
        {isUpdateAvailable || forceUpdate ? (
          <UpdateButton onClick={handleUpdate} nextVersion={nextVersionDetails?.nextVersion ?? ''} />
        ) : null}
        <LastCheck
          onCheckForUpdates={handleCheckForUpdates}
          lastCheckDate={lastCheckDate ?? ''}
          isLoading={isLoading}
        />
      </div>
      <UpdateModal
        errorMessage={error}
        isOpen={showModal}
        isUpdated={isUpdated}
        output={output}
        updateFailed={updateFailed}
        version={installedVersionDetails?.installedVersion ?? ''}
      />
    </>
  );
};
