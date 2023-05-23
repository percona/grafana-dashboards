import { useContext, useEffect, useState } from 'react';
import { QueryAnalyticsProvider } from '../../../provider/provider';
import FiltersService from '../Filters.service';
import {
  FILTERS_GROUPS,
  COMMENT_NAME_LENGTH,
  HIDDEN_FILTER_LABELS,
} from '../Filters.constants';

export const useFilters = (): [any, boolean, any, boolean] => {
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filtersGroups, setFiltersGroups] = useState(FILTERS_GROUPS);

  const {
    panelState: {
      labels = {}, from, to, columns,
    },
  } = useContext(QueryAnalyticsProvider);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await FiltersService.getQueryOverviewFiltersList(labels, from, to, columns[0]);

        const filtersGroups = Object.keys(result)
          .filter((key) => !FILTERS_GROUPS.some((group) => group.dataKey === key))
          .filter((key) => !HIDDEN_FILTER_LABELS.includes(key))
          .reduce((groups, key) => {
            if (result[key].name) {
              groups.push({
                name: key
                  .replace(/^\w/, (c) => c.toUpperCase())
                  .replace(/_/g, ' ')
                  .substring(0, COMMENT_NAME_LENGTH),
                dataKey: key,
              });
            }

            return groups;
          }, [...FILTERS_GROUPS]);

        setFilters(result);
        setFiltersGroups(filtersGroups);
      } catch (e) {
        setError(true);
        // TODO: add error handling
      } finally {
        setLoading(false);
      }
    })();
  }, [labels, from, to, columns]);

  return [filters, loading, filtersGroups, error];
};
