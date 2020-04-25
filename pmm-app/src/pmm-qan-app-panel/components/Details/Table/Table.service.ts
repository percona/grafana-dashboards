import { apiRequestManagement } from '../../../../react-plugins-deps/helpers/api';

class TableService {
  static getShowCreateTableMySQL({ database, service_id, table_name }) {
    const body = {
      database,
      service_id,
      table_name,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowCreateTable', body);
  }

  static getShowCreateTablePostgreSQL({ service_id, table_name }) {
    const body = {
      service_id,
      table_name,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartPostgreSQLShowCreateTable', body);
  }

  static getActionResult({ action_id }) {
    const body = {
      action_id,
    };
    return apiRequestManagement.post<any, any>('/Actions/Get', body);
  }
}

export default TableService;
