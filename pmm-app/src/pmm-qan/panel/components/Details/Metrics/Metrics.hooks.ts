import { useContext, useEffect, useState } from 'react';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { processMetrics } from 'shared/components/helpers/processMetrics';
import { METRIC_CATALOGUE } from 'pmm-qan/panel/QueryAnalytics.constants';
import MetricsService from './Metrics.service';

export const useMetricsDetails = (): [any[], boolean] => {
  const {
    contextActions,
    panelState: {
      queryId, groupBy, from, to, labels, totals,
    },
  } = useContext(QueryAnalyticsProvider);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        setLoading(true);
        const result = await MetricsService.getMetrics({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels,
          totals,
        });

        setMetrics(processMetrics(METRIC_CATALOGUE, result));
        contextActions.setFingerprint(groupBy === 'queryid' ? result.fingerprint : queryId);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        // TODO: add error handling
      }
    };

    getMetrics();
  }, [queryId, groupBy, from, to, labels, totals]);

  return [metrics, loading];
};
