import { apiRequestQAN } from 'shared/components/helpers/api';
import { QueryPlan, QueryPlanRequest, QueryPlanResponse } from './Plan.types';

export const PlanService = {
  async getPlan(queryId?: string): Promise<QueryPlan | undefined> {
    const body = {
      queryid: queryId,
    };

    return apiRequestQAN
      .post<QueryPlanResponse, QueryPlanRequest>('/ObjectDetails/GetQueryPlan', body)
      .then(({ planid, query_plan }) => (
        planid && query_plan ? { id: planid, plan: query_plan } : undefined
      ));
  },
};
