import React, {
  useEffect, useState, FC, MouseEvent,
} from 'react';
import { Button, Spinner } from '@grafana/ui';
import { logger } from '@percona/platform-core';
import {
  AvailableUpdate, CurrentVersion, InfoBox, LastCheck, ProgressModal,
} from 'pmm-update/components';
import { useVersionDetails, usePerformUpdate } from 'pmm-update/hooks';

import { SettingsService } from 'shared/core';
import * as styles from './UpdatePanel.styles';

export const UpdatePanel: FC<{}> = () => {
  const isOnline = navigator.onLine;
  const [forceUpdate, setForceUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [updatesDisabled, setUpdatesDisabled] = useState(false);
  const [isLoadingSettings, setLoadingSettings] = useState(true);
  const [hasNoAccess, setHasNoAccess] = useState(false);
  const [
    {
      installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable,
    },
    fetchVersionErrorMessage,
    isLoadingVersionDetails,
    isDefaultView,
    getCurrentVersionDetails,
  ] = useVersionDetails();
  const [output, updateErrorMessage, isUpdated, updateFailed, launchUpdate] = usePerformUpdate();
  const isLoading = isLoadingVersionDetails || isLoadingSettings;

  const getSettings = async () => {
    setLoadingSettings(true);

    try {
      const { updatesDisabled } = await SettingsService.getSettings(true);

      setUpdatesDisabled(!!updatesDisabled);
    } catch (e: any) {
      if (e.response?.status === 401) {
        setHasNoAccess(true);
      }

      logger.error(e);
    }

    setLoadingSettings(false);
  };

  const handleCheckForUpdates = (e: MouseEvent) => {
    if (e.altKey) {
      setForceUpdate(true);
    }

    getCurrentVersionDetails({ force: true });
  };

  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    setErrorMessage(fetchVersionErrorMessage || updateErrorMessage);

    const timeout = setTimeout(() => {
      setErrorMessage('');
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [fetchVersionErrorMessage, updateErrorMessage]);

  const handleUpdate = () => {
    setShowModal(true);
    launchUpdate();
  };

  return (
    <>
      <div className={styles.panel}>
        <CurrentVersion installedVersionDetails={installedVersionDetails} />
        {isUpdateAvailable && !isDefaultView && !updatesDisabled && !hasNoAccess && !isLoading && isOnline ? (
          <AvailableUpdate nextVersionDetails={nextVersionDetails} />
        ) : null}
        {isLoading ? (
          <div className={styles.middleSectionWrapper}>
            <Spinner />
          </div>
        ) : (
          <>
            {(isUpdateAvailable || forceUpdate) && !updatesDisabled && !hasNoAccess && isOnline ? (
              <div className={styles.middleSectionWrapper}>
                <Button onClick={handleUpdate} icon={'fa fa-download' as any} variant="secondary">
                  Upgrade to
                  {' '}
                  {nextVersionDetails?.nextVersion}
                </Button>
              </div>
            ) : (
              <InfoBox
                upToDate={!isDefaultView && !forceUpdate}
                hasNoAccess={hasNoAccess}
                updatesDisabled={updatesDisabled}
                isOnline={isOnline}
              />
            )}
          </>
        )}
        <LastCheck
          disabled={isLoading || updatesDisabled || !isOnline}
          onCheckForUpdates={handleCheckForUpdates}
          lastCheckDate={lastCheckDate}
        />
      </div>
      <ProgressModal
        errorMessage={errorMessage}
        isOpen={showModal}
        isUpdated={isUpdated}
        output={output}
        updateFailed={updateFailed}
        version={nextVersionDetails?.nextVersion}
      />
    </>
  );
};
