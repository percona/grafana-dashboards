import { apiRequestActions } from 'shared/components/helpers/api';

export default {
  getShowCreateTableMySQL(body) {
    const requestBody = { mysql_show_create_table: body };

    return apiRequestActions.post<any, any>(':startServiceAction', requestBody);
  },

  getMysqlTableStatus(body) {
    const requestBody = { mysql_show_table_status: body };

    return apiRequestActions.post<any, any>(':startServiceAction', requestBody);
  },

  getMysqlIndex(body) {
    const requestBody = { mysql_show_index: body };

    return apiRequestActions.post<any, any>(':startServiceAction', requestBody);
  },

  getTraditionalExplainJSONMysql(body) {
    const requestBody = { mysql_explain_traditional_json: body };

    return apiRequestActions.post<any, any>(':startServiceAction', requestBody);
  },

  getTraditionalExplainMysql(body) {
    const requestBody = { mysql_explain_json: body };

    return apiRequestActions.post<any, any>(':startServiceAction', requestBody);
  },
};
