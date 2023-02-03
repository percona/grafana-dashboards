import { apiRequestManagement } from 'shared/components/helpers/api';
import { PostgreSQLExplainBody, PostgreSQLExplainResponse } from './postgresql.types';

export default {
  getPostgreSQLIndex(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartPostgreSQLShowIndex', body);
  },
  getShowCreateTablePostgreSQL(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartPostgreSQLShowCreateTable', body);
  },
  getPostgreSQLExplain(body: PostgreSQLExplainBody) {
    return apiRequestManagement.post<PostgreSQLExplainResponse, PostgreSQLExplainBody>(
      '/Actions/StartPostgreSQLExplain',
      body,
    );
  },
};
