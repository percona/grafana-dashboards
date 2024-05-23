import { apiRequestActions } from 'shared/components/helpers/api';

export default {
  getPostgreSQLIndex(body) {
    const requestBody = { postgres_show_index: body };

    return apiRequestActions.post<any, any>(':startServiceAction', requestBody);
  },
  getShowCreateTablePostgreSQL(body) {
    const requestBody = { postgres_show_create_table: body };

    return apiRequestActions.post<any, any>(':startServiceAction', requestBody);
  },
};
