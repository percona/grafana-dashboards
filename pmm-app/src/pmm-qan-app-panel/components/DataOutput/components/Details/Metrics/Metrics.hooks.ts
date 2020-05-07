import { useContext, useEffect, useState } from 'react';
import { PanelProvider } from '../../../../../panel/panel.provider';
import MetricsService from './Metrics.service';
import { processMetrics } from '../../../../../../react-plugins-deps/helpers/processMetrics';
import { METRIC_CATALOGUE } from '../../../../../panel/panel.constants';

export const useMetricsDetails = (): [any[], boolean] => {
  const {
    contextActions,
    panelState: { queryId, groupBy, from, to, labels },
  } = useContext(PanelProvider);
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
        });
        setMetrics(processMetrics(METRIC_CATALOGUE, result));
        contextActions.setFingerprint(groupBy === 'queryid' ? result.fingerprint : queryId);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        //TODO: add error handling
      }
    };
    getMetrics();
  }, [queryId]);

  return [metrics, loading];
};
