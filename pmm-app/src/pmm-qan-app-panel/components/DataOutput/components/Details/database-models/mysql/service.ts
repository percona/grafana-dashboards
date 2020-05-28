import { apiRequestManagement } from '../../../../../../../react-plugins-deps/components/helpers/api';

export default class MysqlDatabaseService {
  static getShowCreateTableMySQL(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowCreateTable', body);
  }

  static getMysqlTableStatus(body) {
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

  static getTraditionalExplainJSONMysql(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplainJSON', body);
  }

  static getTraditionalExplainMysql(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplain', body);
  }
}
