import { apiRequestManagement } from '../../../../../react-plugins-deps/components/helpers/api';

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
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplainTraditionalJSON', body);
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
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplain', body);
  }
}

export default ExplainService;
