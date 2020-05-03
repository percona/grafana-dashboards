import { apiRequestManagement } from '../../../../../../../../react-plugins-deps/helpers/api';

class TableService {
  static getShowCreateTableMySQL({ service_id, table_name }) {
    const body = {
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
}

export default TableService;
