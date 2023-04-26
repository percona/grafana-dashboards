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

        const filteredResult = Object.keys(result)
          .filter((key) => !FILTERS_GROUPS.some((group) => group.dataKey === key))
          .filter((key) => !HIDDEN_FILTER_LABELS.includes(key))
          .reduce((obj, key) => {
            obj[key] = result[key];

            return obj;
          }, {});

        Object.keys(filteredResult).forEach((commentKey) => FILTERS_GROUPS.push({
          name: `Comment ${commentKey.substring(0, COMMENT_NAME_LENGTH)}`,
          dataKey: commentKey,
        }));

        setFilters(result);
      } catch (e) {
        setError(true);
        // TODO: add error handling
      } finally {
        setLoading(false);
      }
    })();
  }, [labels, from, to, columns]);

  return [filters, loading, FILTERS_GROUPS, error];
};
