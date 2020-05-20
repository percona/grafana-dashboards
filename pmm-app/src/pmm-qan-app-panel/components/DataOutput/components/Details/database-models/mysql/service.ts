import { apiRequestManagement } from '../../../../../../../react-plugins-deps/components/helpers/api';

export default class MysqlDatabaseService {
  static getShowCreateTableMySQL({ database, service_id, table_name }) {
    const body = {
      database,
      service_id,
      table_name,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowCreateTable', body);
  }

  static getMysqlTableStatus({ database, service_id, table_name }) {
    const body = {
      database,
      service_id,
      table_name,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowTableStatus', body);
  }

  static getMysqlIndex({ database, service_id, table_name }) {
    const body = {
      database,
      service_id,
      table_name,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowIndex', body);
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
}
