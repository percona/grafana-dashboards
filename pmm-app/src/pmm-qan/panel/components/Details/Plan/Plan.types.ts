import { QueryDimension } from 'pmm-qan/panel/provider/provider.types';

export interface QueryPlan {
  id: string;
  plan: string;
}

export interface QueryPlanRequest {
  filter_by: string;
  group_by: QueryDimension;
  period_start_from: string;
  period_start_to: string;
  labels: any;
  totals: boolean;
}

export interface QueryPlanResponse {
  query_plans: QueryPlanAPI[];
}

export interface QueryPlanAPI {
  planid: string;
  query_plan: string;
}
