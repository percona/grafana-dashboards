import { apiRequestManagement, apiRequestQAN } from '../../../../../react-plugins-deps/helpers/api';

class DetailsService {
  static async getExample({ filterBy, groupBy, labels = [], from, to, tables = [] }) {
    const data = {
      filter_by: filterBy,
      group_by: groupBy,
      labels:
        Object.keys(labels).map(key => {
          return {
            key: key,
            value: labels[key],
          };
        }) || [],
      period_start_from: from,
      period_start_to: to,
      tables: tables,
    };

    return apiRequestQAN.post<any, any>('/ObjectDetails/GetQueryExample', data);
  }

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

export default DetailsService;
