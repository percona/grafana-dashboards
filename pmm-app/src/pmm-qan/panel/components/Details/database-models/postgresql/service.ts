import { apiRequest } from 'shared/components/helpers/api';

export default {
  getPostgreSQLIndex(body) {
    const requestBody = { postgres_show_index: body };

    return apiRequest.post<any, any>('/v1/actions:startServiceAction', requestBody);
  },
  getShowCreateTablePostgreSQL(body) {
    const requestBody = { postgres_show_create_table: body };

    return apiRequest.post<any, any>('/v1/actions:startServiceAction', requestBody);
  },
};
