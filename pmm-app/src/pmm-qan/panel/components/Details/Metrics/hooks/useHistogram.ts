import { useContext, useEffect, useState } from 'react';
import { DataFrame, GrafanaTheme } from '@grafana/data';
import { logger } from '@percona/platform-core';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import MetricsService from '../Metrics.service';
import { histogramToDataFrame } from '../Metrics.utils';

export const useHistogram = (theme: GrafanaTheme): [DataFrame[], boolean] => {
  const {
    panelState: {
      queryId, from, to, labels,
    },
  } = useContext(QueryAnalyticsProvider);
  const [data, setData] = useState<DataFrame[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getHistogram = async () => {
      try {
        setLoading(true);
        const result = await MetricsService.getHistogram({
          queryId,
          labels,
          from,
          to,
        });

        setData(histogramToDataFrame(result, theme));
        setLoading(false);
      } catch (e) {
        setLoading(false);
        logger.error(e);
      }
    };

    getHistogram();
  }, [queryId, from, to, labels]);

  return [data, loading];
};
