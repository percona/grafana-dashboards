import { apiRequest } from '../../../../../react-plugins-deps/components/helpers/api';

interface ExplainInterface {
  pmm_agent_id: 'string';
  service_id: 'string';
  query: 'string';
  database: 'string';
}
class ExplainService {
  static async getTraditionalExplainJSON({ filterBy, groupBy, labels, periodStartFrom, periodStartTo, tables }) {
    const body = {
      filter_by: filterBy,
      group_by: groupBy,
      labels: labels || [],
      period_start_from: periodStartFrom,
      period_start_to: periodStartTo,
      tables: tables || [],
    };
    return apiRequest.post<any, any>('/v1/management/Actions/StartMySQLExplainTraditionalJSON', body as ExplainInterface);
  }
  static async getTraditionalExplain({ filterBy, groupBy, labels, periodStartFrom, periodStartTo, tables }) {
    const body = {
      filter_by: filterBy,
      group_by: groupBy,
      labels: labels || [],
      period_start_from: periodStartFrom,
      period_start_to: periodStartTo,
      tables: tables || [],
    };
    return apiRequest.post<any, any>('/v1/management/Actions/StartMySQLExplainTraditional', body as ExplainInterface);
  }
}

export default ExplainService;
