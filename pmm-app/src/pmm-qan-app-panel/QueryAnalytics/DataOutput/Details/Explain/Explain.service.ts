import { apiRequestManagement } from '../../../../../react-plugins-deps/components/helpers/api';

class ExplainService {
  static getTraditionalExplainJSON({ database, service_id, query }) {
    const body = {
      database,
      service_id,
      query,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplainJSON', body);
  }
  static getTraditionalExplain({ database, service_id, query }) {
    const body = {
      database,
      service_id,
      query,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplain', body);
  }

  static getActionResult({ action_id }) {
    const body = {
      action_id,
    };
    return apiRequestManagement.post<any, any>('/Actions/Get', body);
  }
}

export default ExplainService;
