import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import {
  AvailableUpdate,
  LastCheck,
  UpdateButton,
  UpdateHeader,
  UpdateInfoBox,
  UpdateModal,
} from 'pmm-update/components';

import { getCurrentVersion, getUpdates, startUpdate, getUpdateStatus } from './UpdatePanel.service';
import { Messages } from './UpdatePanel.messages';
import * as styles from './UpdatePanel.styles';

export const UpdatePanel = () => {
  const [version, setVersion] = useState('');
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isDefaultView, setIsDefaultView] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [newsLink, setNewsLink] = useState('');
  const [nextVersion, setNextVersion] = useState('');
  const [nextFullVersion, setNextFullVersion] = useState('');
  const [fullVersion, setFullVersion] = useState('');
  const [newReleaseDate, setNewReleaseDate] = useState('');
  const [lastCheckDate, setLastCheckDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentReleaseDate, setCurrentReleaseDate] = useState('');
  const [updateFailed, setUpdateFailed] = useState(false);
  const [versionCached, setVersionCached] = useState('');
  const [nextVersionCached, setNextVersionCached] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [output, setOutput] = useState('');

  const displayError = useCallback(message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  }, []);

  const handleShowFullCurrentVersion = useCallback(
    e => {
      if (e.altKey) {
        if (version !== fullVersion) {
          setVersionCached(version);
          setVersion(fullVersion);
        } else {
          setVersion(versionCached);
        }
      }
    },
    [version, fullVersion, versionCached]
  );

  const handleShowFullAvailableVersion = useCallback(
    (e: MouseEvent) => {
      if (e.altKey) {
        if (nextVersion !== nextFullVersion) {
          setNextVersionCached(nextVersion);
          setNextVersion(nextFullVersion);
        } else {
          setNextVersion(nextVersionCached);
        }
      }
    },
    [nextVersion, nextFullVersion, nextVersionCached]
  );

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
      setErrorMessage(e.message);
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
      const { auth_token, log_offset } = data;
      await updateLogs(auth_token, log_offset);
    } catch (e) {
      setUpdateFailed(true);
      console.error(e);
    }
  }, [updateLogs]);

  const handleCheckForUpdates = useCallback(async (e: MouseEvent) => {
    setIsLoading(true);

    if (e.altKey) {
      setForceUpdate(true);
    }

    try {
      const data = await getUpdates();

      setNextVersion(data.latest.version || '');
      setNextFullVersion(data.latest.full_version || '');
      setLastCheckDate(
        data.last_check
          ? moment(data.last_check)
              .locale('en')
              .format('MMMM DD, H:mm')
          : ''
      );
      setNewReleaseDate(
        data.latest.timestamp
          ? moment
              .utc(data.latest.timestamp)
              .locale('en')
              .format('MMMM DD')
          : ''
      );
      setNewsLink(data.latest_news_url || '');
      setIsUpdateAvailable(data.update_available || false);
      setIsDefaultView(false);
    } catch (e) {
      displayError(Messages.nothingToUpdate);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCurrentVersionDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCurrentVersion();
      setNextVersion(data.latest.version || '');
      setNextFullVersion(data.latest.full_version || '');
      setLastCheckDate(
        data.last_check
          ? moment(data.last_check)
              .locale('en')
              .format('MMMM DD, H:mm')
          : ''
      );
      setVersion(data.installed.version || '');
      setFullVersion(data.installed.full_version || '');
      setCurrentReleaseDate(
        data.installed.timestamp
          ? moment
              .utc(data.installed.timestamp)
              .locale('en')
              .format('MMMM DD')
          : ''
      );
      setNewReleaseDate(
        data.latest.timestamp
          ? moment
              .utc(data.latest.timestamp)
              .locale('en')
              .format('MMMM DD')
          : ''
      );
      setNewsLink(data.latest_news_url || '');
      setIsUpdateAvailable(data.update_available || false);
      setIsDefaultView(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentVersionDetails();
  }, [getCurrentVersionDetails]);

  return (
    <>
      <div className={styles.panel}>
        <UpdateHeader
          currentReleaseDate={currentReleaseDate}
          onExpandVersion={handleShowFullCurrentVersion}
          version={version}
        />
        {isDefaultView && <UpdateInfoBox />}
        {!isUpdateAvailable && !isDefaultView && !forceUpdate ? <UpdateInfoBox upToDate /> : null}
        {isUpdateAvailable && !isDefaultView ? (
          <AvailableUpdate
            onShowFullAvailableVersion={handleShowFullAvailableVersion}
            newReleaseDate={newReleaseDate}
            newsLink={newsLink}
            nextVersion={nextVersion}
          />
        ) : null}
        {isUpdateAvailable || forceUpdate ? (
          <UpdateButton onClick={handleUpdate} nextVersion={nextVersion} />
        ) : null}
        <LastCheck
          onCheckForUpdates={handleCheckForUpdates}
          lastCheckDate={lastCheckDate}
          isLoading={isLoading}
        />
      </div>
      <UpdateModal
        errorMessage={errorMessage}
        isOpen={showModal}
        isUpdated={isUpdated}
        output={output}
        updateFailed={updateFailed}
        version={version}
      />
    </>
  );
};
