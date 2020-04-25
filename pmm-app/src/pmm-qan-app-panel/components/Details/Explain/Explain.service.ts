import { apiRequestManagement } from '../../../../react-plugins-deps/helpers/api';

class ExplainService {
  static getTraditionalExplainJSONMysql({ database, service_id, query }) {
    const body = {
      database,
      service_id,
      query,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplainJSON', body);
  }
  static getTraditionalExplainMysql({ database, service_id, query }) {
    const body = {
      database,
      service_id,
      query,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplain', body);
  }

  static getTraditionalExplainJSONMongo({ pmm_agent_id, service_id, query }) {
    const body = {
      pmm_agent_id,
      service_id,
      query,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMongoDBExplain', body);
  }

  static getActionResult({ action_id }) {
    const body = {
      action_id,
    };
    return apiRequestManagement.post<any, any>('/Actions/Get', body);
  }
}

export default ExplainService;
