import { apiRequestManagement } from '../../../../../react-plugins-deps/components/helpers/api';

class ExplainService {
  static getTraditionalExplainJSON({ filterBy, groupBy, labels = [], from, to, tables = [] }) {
    const body = {
      filter_by: filterBy,
      group_by: groupBy,
      labels: labels,
      period_start_from: from,
      period_start_to: to,
      tables: tables,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplainTraditionalJSON', body);
  }
  static getTraditionalExplain({ filterBy, groupBy, labels = [], from, to, tables = [] }) {
    const body = {
      filter_by: filterBy,
      group_by: groupBy,
      labels: labels,
      period_start_from: from,
      period_start_to: to,
      tables: tables,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplain', body);
  }
}

export default ExplainService;
