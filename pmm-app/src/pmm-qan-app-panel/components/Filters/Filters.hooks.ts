import { useContext, useEffect, useState } from 'react';
import { PanelProvider } from '../../panel/panel.provider';
import FiltersService from './Filters.service';

export const useFilters = () => {
  const [filters, setFilters] = useState({});
  const {
    panelState: { labels = {}, from, to, columns },
  } = useContext(PanelProvider);

  useEffect(() => {
    (async () => {
      try {
        const result = await FiltersService.getQueryOverviewFiltersList(labels, from, to, columns[0]);
        if (result) {
          setFilters(result);
        }
        // setGroups(FILTERS_GROUPS);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, [labels, from, to, columns]);

  return filters;
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
        Array.isArray(values) &&
          values.forEach(value => {
            acc[`${key}:${value.replace(/\./gi, '--') || 'na'}`] = true;
          });
        return acc;
      }, {});
      setInitialValues(initialFiltersValues);
    })();
  }, [labels]);

  return initialValues;
};
