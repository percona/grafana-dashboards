import { useContext, useEffect, useState } from 'react';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { processMetrics } from 'shared/components/helpers/processMetrics';
import { METRIC_CATALOGUE } from 'pmm-qan/panel/QueryAnalytics.constants';
import MetricsService from '../Metrics.service';
import { TextMetrics } from '../Metrics.types';

export const useMetricsDetails = (): [any[], TextMetrics, boolean] => {
  const {
    contextActions,
    panelState: {
      queryId, groupBy, from, to, labels, totals,
    },
  } = useContext(QueryAnalyticsProvider);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [textMetrics, setTextMetrics] = useState<TextMetrics>({});
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
        setTextMetrics(result.text_metrics);
        contextActions.setFingerprint(groupBy === 'queryid' ? result.fingerprint : queryId);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        // TODO: add error handling
      }
    };

    getMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryId, groupBy, from, to, labels, totals]);

  return [metrics, textMetrics, loading];
};
