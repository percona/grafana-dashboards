import { useContext, useEffect, useState } from 'react';
import { QueryAnalyticsProvider } from '../../../provider/provider';

export const useInitialFilterValues = () => {
  const [initialValues, setInitialValues] = useState({});

  const {
    panelState: { labels = {} },
  } = useContext(QueryAnalyticsProvider);

  useEffect(() => {
    (async () => {
      const initialFiltersValues = Object.entries(labels).reduce((acc, data) => {
        const [key, values] = data;

        if (Array.isArray(values)) {
          values.forEach((value) => {
            acc[`${key};${value.replace(/\./gi, '--') || 'na'}`] = true;
          });
        }

        return acc;
      }, {});

      setInitialValues(initialFiltersValues);
    })();
  }, [labels]);

  return initialValues;
};
