import { apiRequestManagement } from 'shared/components/helpers/api';

export default class MysqlDatabaseService {
  static getShowCreateTableMySQL(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowCreateTable', body);
  }

  static getMysqlTableStatus(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowTableStatus', body);
  }

  static getMysqlIndex(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowIndex', body);
  }

  static getTraditionalExplainJSONMysql(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplainJSON', body);
  }

  static getTraditionalExplainMysql(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplain', body);
  }
}
