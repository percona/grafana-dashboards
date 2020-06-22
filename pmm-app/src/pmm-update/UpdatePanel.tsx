import React, { MouseEvent, useCallback, useEffect, useState } from 'react';

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
  const [error, setError] = useState('');
  const [
    { installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable }, errorMessage,
    isLoading,
    isDefaultView,
    getCurrentVersionDetails
  ] = useVersionDetails()
  const [output, updateErrorMessage, isUpdated, updateFailed, launchUpdate] = usePerformUpdate()

  const handleCheckForUpdates = useCallback((e: MouseEvent) => {
    if (e.altKey) {
      setForceUpdate(true);
    }
    getCurrentVersionDetails(true);
  }, []);

  useEffect(() => {
    setError(updateErrorMessage);
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [updateErrorMessage]);

  useEffect(() => {
    setError(errorMessage);
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [errorMessage]);

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
