import { useContext, useEffect, useState } from 'react';
import { logger } from '@percona/platform-core';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { PlanService } from './Plan.service';
import { QueryPlan } from './Plan.types';

export const usePlan = (): [QueryPlan | undefined, boolean] => {
  const {
    panelState: {
      queryId, groupBy, from, to, labels, totals,
    },
  } = useContext(QueryAnalyticsProvider);
  const [plan, setPlan] = useState<QueryPlan | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPlan = async () => {
      try {
        setLoading(true);
        const result = await PlanService.getPlan({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels,
          totals,
        });

        setPlan(result);
      } catch (e) {
        logger.error(e);
      } finally {
        setLoading(false);
      }
    };

    getPlan();
  }, [queryId, groupBy, from, to, labels, totals]);

  return [plan, loading];
};
