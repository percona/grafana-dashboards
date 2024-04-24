import { apiRequestQAN } from 'shared/components/helpers/api';
import { QueryPlan, QueryPlanRequest, QueryPlanResponse } from './Plan.types';

export const PlanService = {
  async getPlan(queryId?: string): Promise<QueryPlan | undefined> {
    const body = {
      queryid: queryId,
    };

    return apiRequestQAN
      .get<QueryPlanResponse, QueryPlanRequest>(`/v1/qan/query/${body.queryid}/plan`)
      .then(({ planid, query_plan }) => (
        planid && query_plan ? { id: planid, plan: query_plan } : undefined
      ));
  },
};
