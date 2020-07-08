import { useEffect, useState } from 'react';

import { ApiCall } from 'pmm-update/types';

export const useApiCall = <R, A>(apiFn: (apiFnArgs?: A) => Promise<R>, apiFnArgs?: A): ApiCall<R, A> => {
  const [data, setData] = useState<R>();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = async (apiFnArgs?: A) => {
    setIsLoading(true);

    try {
      const response = await apiFn(apiFnArgs);
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
    apiCall(apiFnArgs);
  }, []);

  return [data, errorMessage, isLoading, apiCall];
};
