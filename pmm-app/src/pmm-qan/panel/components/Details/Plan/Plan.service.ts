import { apiRequestQAN } from 'shared/components/helpers/api';
import { getLabelQueryParams } from 'pmm-qan/panel/QueryAnalytics.tools';
import { QueryPlan, QueryPlanRequest, QueryPlanResponse } from './Plan.types';

export const PlanService = {
  async getPlan({
    filterBy, groupBy, labels = [], from, to, totals,
  }): Promise<QueryPlan> {
    const body = {
      filter_by: filterBy || '',
      group_by: groupBy,
      labels: getLabelQueryParams(labels),
      period_start_from: from,
      period_start_to: to,
      totals,
    };

    return apiRequestQAN
      .post<QueryPlanResponse, QueryPlanRequest>('/ObjectDetails/GetQueryPlan', body)
      .then((res) => res.query_plans.filter((plan) => plan.planid && plan.query_plan)
        .map(({ planid, query_plan }) => ({ id: planid, plan: query_plan }))[0]);
  },
};
