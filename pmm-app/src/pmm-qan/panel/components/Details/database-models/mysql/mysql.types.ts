export interface MySQLExplainPayload {
  database?: string;
  service_id: string;
  query?: string;
  query_id?: string;
  placeholders?: string[];
}
