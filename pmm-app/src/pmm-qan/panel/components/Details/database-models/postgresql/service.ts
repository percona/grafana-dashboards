import { apiRequestManagement } from 'shared/components/helpers/api';

export default {
  getPostgreSQLIndex(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartPostgreSQLShowIndex', body);
  },
  getShowCreateTablePostgreSQL(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartPostgreSQLShowCreateTable', body);
  },
};
