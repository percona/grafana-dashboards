import { apiRequestManagement } from 'shared/components/helpers/api';

export default {
  getShowCreateTableMySQL(body) {
    return apiRequestManagement.postCancelable<any, any>('/Actions/StartMySQLShowCreateTable', body);
  },

  getMysqlTableStatus(body) {
    return apiRequestManagement.postCancelable<any, any>('/Actions/StartMySQLShowTableStatus', body);
  },

  getMysqlIndex(body) {
    return apiRequestManagement.postCancelable<any, any>('/Actions/StartMySQLShowIndex', body);
  },

  getTraditionalExplainJSONMysql(body) {
    return apiRequestManagement.postCancelable<any, any>('/Actions/StartMySQLExplainJSON', body);
  },

  getTraditionalExplainMysql(body) {
    return apiRequestManagement.postCancelable<any, any>('/Actions/StartMySQLExplain', body);
  },
};
