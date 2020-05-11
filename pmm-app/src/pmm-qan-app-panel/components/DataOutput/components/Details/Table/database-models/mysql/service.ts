import { apiRequestManagement } from '../../../../../../../../react-plugins-deps/helpers/api';

export default class MysqlDatabaseService {
  static getShowCreateTableMySQL({ service_id, table_name }) {
    const body = {
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
}
