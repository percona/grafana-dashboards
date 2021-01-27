import { useContext, useEffect, useState } from 'react';
import { QueryAnalyticsProvider } from '../../../provider/provider';
import FiltersService from '../Filters.service';

export const useFilters = (): [any, boolean, boolean] => {
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

        setFilters(result);
      } catch (e) {
        setError(true);
        // TODO: add error handling
      } finally {
        setLoading(false);
      }
    })();
  }, [labels, from, to, columns]);

  return [filters, loading, error];
};
