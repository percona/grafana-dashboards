import { useContext, useEffect, useState } from 'react';
import { logger } from '@percona/platform-core';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { ChartData } from 'chart.js';
import { useTheme2 } from '@grafana/ui';
import MetricsService from '../Metrics.service';
import { getChartDataFromHistogramItems } from '../Metrics.utils';

export const useHistogram = (isHistogramAvailable: boolean): [ChartData<'bar'> | undefined, boolean] => {
  const theme = useTheme2();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryId, from, to, labels]);

  return [data, loading];
};
