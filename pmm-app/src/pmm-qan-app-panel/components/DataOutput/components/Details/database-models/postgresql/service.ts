import { apiRequestManagement } from '../../../../../../../react-plugins-deps/helpers/api';

export default class PostgresqlDatabaseService {
  static getPostgreSQLIndex({ service_id, table_name }) {
    const body = {
      service_id,
      table_name,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartPostgreSQLShowIndex', body);
  }

  static getShowCreateTablePostgreSQL({ service_id, table_name }) {
    const body = {
      service_id,
      table_name,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartPostgreSQLShowCreateTable', body);
  }
}
