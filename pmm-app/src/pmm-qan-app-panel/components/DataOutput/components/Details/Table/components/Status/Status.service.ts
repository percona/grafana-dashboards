import { apiRequestManagement } from '../../../../../../../../react-plugins-deps/helpers/api';

class StatusService {
  static getMysqlTableStatus({ database, service_id, table_name }) {
    const body = {
      database,
      service_id,
      table_name,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMySQLShowTableStatusAction', body);
  }

  static getActionResult({ action_id }) {
    const body = {
      action_id,
    };
    return apiRequestManagement.post<any, any>('/Actions/Get', body);
  }
}

export default StatusService;
