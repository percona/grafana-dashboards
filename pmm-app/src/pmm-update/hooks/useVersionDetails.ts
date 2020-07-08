import { useEffect, useState } from 'react';

import { useApiCall } from 'pmm-update/hooks';
import { formatDate, formatDateWithTime } from 'pmm-update/UpdatePanel.utils';
import { getCurrentVersion } from 'pmm-update/UpdatePanel.service';
import {
  CurrentOrNextVersionDetails,
  GetUpdatesResponse,
  InstalledVersionDetails,
  NextVersionDetails,
} from 'pmm-update/types';

export const useVersionDetails = (initialForceUpdate = false): CurrentOrNextVersionDetails => {
  const [isDefaultView, setIsDefaultView] = useState(true);
  const [nextVersionDetails, setNextVersionDetails] = useState<NextVersionDetails>({
    nextVersion: '',
    nextFullVersion: '',
    nextVersionDate: '',
    newsLink: '',
  });
  const [installedVersionDetails, setInstalledVersionDetails] = useState<InstalledVersionDetails>({
    installedVersion: '',
    installedFullVersion: '',
    installedVersionDate: '',
  });
  const [lastCheckDate, setLastCheckDate] = useState('');
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [data, errorMessage, isLoading, getVersionDetails] = useApiCall<GetUpdatesResponse | void, boolean>(
    getCurrentVersion,
    initialForceUpdate
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    const { last_check, latest, latest_news_url, installed, update_available } = data;
    const { full_version: latestFullVersion, timestamp: latestTimestamp, version: latestVersion } = latest;
    const {
      full_version: installedFullVersion,
      timestamp: installedVersionTimestamp,
      version: installedVersion,
    } = installed;
    setNextVersionDetails({
      nextVersion: latestVersion ?? '',
      nextFullVersion: latestFullVersion ?? '',
      nextVersionDate: latestTimestamp ? formatDate(latestTimestamp) : '',
      newsLink: latest_news_url ?? '',
    });
    setInstalledVersionDetails({
      installedVersion: installedVersion ?? '',
      installedFullVersion: installedFullVersion ?? '',
      installedVersionDate: installedVersionTimestamp ? formatDate(installedVersionTimestamp) : '',
    });
    setLastCheckDate(last_check ? formatDateWithTime(last_check) : '');
    setIsUpdateAvailable(update_available ?? false);
    setIsDefaultView(false);
  }, [data]);

  return [
    { installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable },
    errorMessage,
    isLoading,
    isDefaultView,
    getVersionDetails,
  ];
};
