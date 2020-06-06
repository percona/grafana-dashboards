import { useContext, useEffect, useState } from 'react';
import { PanelProvider } from 'pmm-qan-app-panel/panel/panel.provider';
import FiltersService from './Filters.service';

export const useFilters = () => {
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    panelState: {
      labels = {}, from, to, columns
    },
  } = useContext(PanelProvider);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await FiltersService.getQueryOverviewFiltersList(labels, from, to, columns[0]);
        setFilters(result);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
        // TODO: add error handling
      }
    })();
  }, [labels, from, to, columns]);

  return { filters, loading, error };
};

export const useInitialFilterValues = () => {
  const [initialValues, setInitialValues] = useState({});

  const {
    panelState: { labels = {} },
  } = useContext(PanelProvider);
  useEffect(() => {
    (async () => {
      const initialFiltersValues = Object.entries(labels).reduce((acc, data) => {
        const [key, values] = data;
        if (Array.isArray(values)) {
          values.forEach((value) => {
            acc[`${key}:${value.replace(/\./gi, '--') || 'na'}`] = true;
          });
        }
        return acc;
      }, {});
      setInitialValues(initialFiltersValues);
    })();
  }, [labels]);

  return initialValues;
};
