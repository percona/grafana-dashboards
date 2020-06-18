import { apiRequestManagement } from 'shared/components/helpers/api';

export default {
  getShowCreateTableMySQL(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowCreateTable', body);
  },

  getMysqlTableStatus(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowTableStatus', body);
  },

  getMysqlIndex(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowIndex', body);
  },

  getTraditionalExplainJSONMysql(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplainJSON', body);
  },

  getTraditionalExplainMysql(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLExplain', body);
  },
};
