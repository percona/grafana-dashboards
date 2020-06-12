import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import { LastCheck, UpdateButton, UpdateModal } from 'pmm-update-panel/components';

import { getCurrentVersion, getUpdates, startUpdate, getUpdateStatus } from './UpdatePanel.service';
import { Messages } from './UpdatePanel.messages';
import * as styles from './UpdatePanel.styles';

export const UpdatePanel = () => {
  const [version, setVersion] = useState('');
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isDefaultView, setIsDefaultView] = useState(false);
  const forceUpdate = false;
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
  const [canBeReloaded, setCanBeReloaded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [updateCntErrors, setUpdateCntErrors] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [updateAuthToken, setUpdateAuthToken] = useState('');
  const [updateLogOffset, setUpdateLogOffset] = useState(0);
  const [output, setOutput] = useState('');

  // TODO (nicolalamacchia): make this work
  const displayError = useCallback(message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  }, []);

  const handleShowFullCurrentVersion = useCallback(e => {
    if (e.altKey) {
      if (version !== fullVersion) {
        setVersionCached(version);
        setVersion(fullVersion);
      } else {
        setVersion(versionCached);
      }
    }
  }, []);

  const handleShowFullAvailableVersion = useCallback(e => {
    if (e.altKey) {
      if (nextVersion !== nextFullVersion) {
        setNextVersionCached(nextVersion);
        setNextVersion(nextFullVersion);
      } else {
        setNextVersion(nextVersionCached);
      }
    }
  }, []);

  const getLog = async () => {
    if (updateCntErrors > 600) {
      setUpdateFailed(true);
      return;
    }

    if (isUpdated) {
      setCanBeReloaded(true);
      return;
    }

    let timeoutId;

    try {
      const data = await getUpdateStatus({ auth_token: updateAuthToken, log_offset: updateLogOffset });
      setIsUpdated('done' in data ? data.done : false);
      setUpdateLogOffset('log_offset' in data ? data.log_offset : 0);
      setOutput(output => `${output}${data.log_lines.join('\n')}\n`);
      setUpdateCntErrors(0);
      timeoutId = setTimeout(getLog, 500);
    } catch (e) {
      setUpdateCntErrors(updateCntErrors => updateCntErrors + 1);
      setErrorMessage(e.message);
      timeoutId = setTimeout(getLog, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  };

  const update = useCallback(async () => {
    setShowModal(true);

    try {
      const data = await startUpdate();
      setUpdateAuthToken(data.auth_token);
      setUpdateLogOffset('log_offset' in data ? data.log_offset : 0);
      getLog();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const checkForUpdates = useCallback(async () => {
    setIsLoading(true);

    // TODO (nicolalamacchia): handle alt+click key
    // if ($event.altKey) {
    //   forceUpdate = true;
    // }

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
  }, []);

  return (
    <>
      <div className={styles.panel}>
        <header>
          <h2 className="update-title">Updates</h2>
          <p className="version" onClick={handleShowFullCurrentVersion}>
            Current version:{' '}
            <span>
              {version} <em>{currentReleaseDate}</em>
            </span>
          </p>
        </header>
        {isDefaultView && (
          <section className="state">
            <p className="text-center">{Messages.noUpdates}</p>
            <p className="text-center">{Messages.updatesNotice}</p>
          </section>
        )}
        {!isUpdateAvailable && !isDefaultView && !forceUpdate ? (
          <section className="state">
            <p className="text-center">{Messages.upToDate}</p>
          </section>
        ) : null}
        {isUpdateAvailable && !isDefaultView ? (
          <section className="available-version">
            <div className="available_version" onClick={handleShowFullAvailableVersion}>
              <p>Available version:&nbsp;</p>
              <div className="version">
                <p>
                  {nextVersion} <em>{newReleaseDate}</em>
                  {newsLink && (
                    <a href={newsLink} className="pmm-link" rel="noreferrer" target="_blank">
                      {' '}
                      What&apos;s new
                    </a>
                  )}
                </p>
              </div>
            </div>
          </section>
        ) : null}
        {isUpdateAvailable || forceUpdate ? (
          <UpdateButton handleUpdate={update} nextVersion={nextVersion} />
        ) : null}
        <LastCheck
          handleCheckForUpdates={checkForUpdates}
          lastCheckDate={lastCheckDate}
          isLoading={isLoading}
        />
      </div>
      {showModal && (
        <UpdateModal
          canBeReloaded={canBeReloaded}
          errorMessage={errorMessage}
          output={output}
          updateFailed={updateFailed}
          isUpdated={isUpdated}
          version={version}
        />
      )}
    </>
  );
};
