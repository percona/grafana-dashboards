import { apiRequestManagement } from 'shared/components/helpers/api';

export default {
  getPostgreSQLIndex(body) {
    return apiRequestManagement.postCancelable<any, any>('/Actions/StartPostgreSQLShowIndex', body);
  },
  getShowCreateTablePostgreSQL(body) {
    return apiRequestManagement.postCancelable<any, any>('/Actions/StartPostgreSQLShowCreateTable', body);
  }
};
