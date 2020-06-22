import { useEffect, useState } from 'react';

import { formatDate, formatDateWithTime } from 'pmm-update/UpdatePanel.utils';
import { getCurrentVersion } from 'pmm-update/UpdatePanel.service';
import {
  CurrentOrNextVersionDetails,
  GetUpdatesResponse,
  InstalledVersionDetails,
  NextVersionDetails,
} from 'pmm-update/types';

const useUpdateDetails = (forceUpdate: boolean) => {
  const [data, setData] = useState<GetUpdatesResponse>();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getVersionDetails = async (forceUpdate = false) => {
    setIsLoading(true);

    try {
      const response = await getCurrentVersion(forceUpdate);
      if (!response) {
        throw Error('Invalid response received');
      }
      setData(response);
    } catch (e) {
      console.error(e);
      setErrorMessage(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVersionDetails(forceUpdate);
  }, []);

  return { data, errorMessage, isLoading, getVersionDetails };
};

export const useVersionDetails = (initialForceUpdate = false): CurrentOrNextVersionDetails => {
  const [isDefaultView, setIsDefaultView] = useState(false);
  const [nextVersionDetails, setNextVersionDetails] = useState<NextVersionDetails>();
  const [installedVersionDetails, setInstalledVersionDetails] = useState<InstalledVersionDetails>();
  const [lastCheckDate, setLastCheckDate] = useState('');
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const { data, errorMessage, isLoading, getVersionDetails } = useUpdateDetails(initialForceUpdate);

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
