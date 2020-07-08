import { useContext, useEffect, useState } from 'react';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import useWindowSize from 'shared/components/helpers/WindowSize.hooks';
import FiltersService from './Filters.service';
import { FILTERS_BODY_HEIGHT, FILTERS_HEADER_SIZE, FILTERS_MARGIN_BOTTOM } from './Filters.constants';

export const useFilters = () => {
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    panelState: {
      labels = {}, from, to, columns
    },
  } = useContext(QueryAnalyticsProvider);

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
  } = useContext(QueryAnalyticsProvider);

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

export const useFiltersContainerHeight = (initialValue, ref) => {
  const windowSize = useWindowSize();
  const [height, setHeight] = useState(initialValue);

  useEffect(() => {
    const filtersWrapperElement = ref.current && ref.current.getBoundingClientRect();
    const filtersHeight = filtersWrapperElement
      ? windowSize[1]
        - filtersWrapperElement.y
        - FILTERS_HEADER_SIZE
        - FILTERS_MARGIN_BOTTOM
      : FILTERS_BODY_HEIGHT;

    setHeight(Math.max(filtersHeight, FILTERS_BODY_HEIGHT));
  }, [windowSize[1]]);

  return height;
};
