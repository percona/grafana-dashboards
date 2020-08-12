import { useEffect, useState } from 'react';
import { getLocationSrv } from '@grafana/runtime';

export const useUrlState = (key: string, defaultValue?: string): [string, (parameter: string) => void] => {
  const query = new URLSearchParams(window.location.search);
  const [value, setValue] = useState<string>(defaultValue || '');

  const setParameter = (parameter) => {
    getLocationSrv().update({
      query: { [key]: parameter },
      partial: true,
    });

    setValue(parameter);
  };

  useEffect(() => {
    if (query.get(key)) {
      setValue(query.get(key) || '');
    } else {
      setParameter(value);
    }
  }, [key]);

  return [value, setParameter];
};
