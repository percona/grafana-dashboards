import { apiRequest } from 'shared/components/helpers/api';

export default {
  getShowCreateTableMySQL(body) {
    const requestBody = { mysql_show_create_table: body };

    return apiRequest.post<any, any>('/v1/actions:startServiceAction', requestBody);
  },

  getMysqlTableStatus(body) {
    const requestBody = { mysql_show_table_status: body };

    return apiRequest.post<any, any>('/v1/actions:startServiceAction', requestBody);
  },

  getMysqlIndex(body) {
    const requestBody = { mysql_show_index: body };

    return apiRequest.post<any, any>('/v1/actions:startServiceAction', requestBody);
  },

  getExplainJSON(body) {
    const requestBody = { mysql_explain_json: body };

    return apiRequest.post<any, any>('/v1/actions:startServiceAction', requestBody);
  },

  getExplain(body) {
    const requestBody = { mysql_explain: body };

    return apiRequest.post<any, any>('/v1/actions:startServiceAction', requestBody);
  },
};
