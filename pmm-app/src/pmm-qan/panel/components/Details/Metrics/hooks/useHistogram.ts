import { useContext, useEffect, useState } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { logger } from '@percona/platform-core';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { ChartData } from 'chart.js';
import MetricsService from '../Metrics.service';
import { getChartDataFromHistogramItems } from '../Metrics.utils';

export const useHistogram = (theme: GrafanaTheme2, isHistogramAvailable: boolean): [ChartData<'bar'> | undefined, boolean] => {
  const {
    panelState: {
      queryId, from, to, labels,
    },
  } = useContext(QueryAnalyticsProvider);
  const [data, setData] = useState<ChartData<'bar'>|undefined>();
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

        setData(getChartDataFromHistogramItems(result.histogram_items, theme));
        setLoading(false);
      } catch (e) {
        setLoading(false);
        logger.error(e);
      }
    };

    if (isHistogramAvailable) {
      getHistogram();
    }
  }, [queryId, from, to, labels]);

  return [data, loading];
};
