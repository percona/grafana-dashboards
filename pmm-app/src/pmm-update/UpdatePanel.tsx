import React, { MouseEvent, useEffect, useState } from 'react';

import {
  AvailableUpdate,
  LastCheck,
  UpdateButton,
  UpdateHeader,
  UpdateInfoBox,
  UpdateModal,
} from 'pmm-update/components';
import { useVersionDetails, usePerformUpdate } from 'pmm-update/hooks';

import * as styles from './UpdatePanel.styles';

export const UpdatePanel = () => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [
    { installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable }, fetchVersionErrorMessage,
    isLoading,
    isDefaultView,
    getCurrentVersionDetails
  ] = useVersionDetails()
  const [output, updateErrorMessage, isUpdated, updateFailed, launchUpdate] = usePerformUpdate()

  const handleCheckForUpdates = (e: MouseEvent) => {
    if (e.altKey) {
      setForceUpdate(true);
    }
    getCurrentVersionDetails(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage('');
    }, 5000);

    return () => {
      clearTimeout(timeout)
    }
  }, [fetchVersionErrorMessage, updateErrorMessage])

  useEffect(() => {
    setErrorMessage(updateErrorMessage);
  }, [updateErrorMessage]);

  useEffect(() => {
    setErrorMessage(fetchVersionErrorMessage);
  }, [fetchVersionErrorMessage]);

  const handleUpdate = () => {
    setShowModal(true);
    launchUpdate();
  };

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
        errorMessage={errorMessage}
        isOpen={showModal}
        isUpdated={isUpdated}
        output={output}
        updateFailed={updateFailed}
        version={installedVersionDetails?.installedVersion ?? ''}
      />
    </>
  );
};
