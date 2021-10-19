export interface QueryPlan {
  id: string;
  plan: string;
}

export interface QueryPlanRequest {
  queryid?: string;
}

export interface QueryPlanResponse {
  planid: string;
  query_plan: string;
}
