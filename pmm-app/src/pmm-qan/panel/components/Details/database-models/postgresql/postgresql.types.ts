export interface PostgreSQLExplainBody {
  pmmAgentId?: string;
  serviceId: string;
  queryId: string;
  placeholders: string[];
  database?: string;
}

export interface PostgreSQLExplainResponse {
  action_id: string;
  pmm_agent_id: string;
}

export interface PostgreSQLExplain {
  serviceId: string;
  queryId: string;
  placeholders: string[];
}
