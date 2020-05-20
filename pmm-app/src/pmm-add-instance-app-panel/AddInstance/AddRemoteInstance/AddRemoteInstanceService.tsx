import { apiRequestManagement } from '../../../react-plugins-deps/components/helpers/api';

class AddRemoteInstanceService {
  static async addMysql(body) {
    return apiRequestManagement.post<any, any>('/MySQL/Add', body);
  }

  static async addPostgresql(body) {
    return apiRequestManagement.post<any, any>('/PostgreSQL/Add', body);
  }

  static async addProxysql(body) {
    return apiRequestManagement.post<any, any>('/ProxySQL/Add', body);
  }

  static async addMongodb(body) {
    return apiRequestManagement.post<any, any>('/MongoDB/Add', body);
  }

  static async addRDS(body) {
    return apiRequestManagement.post<any, any>('/RDS/Add', body);
  }

  static addRemote(type, data) {
    switch (type) {
      case 'MongoDB':
        return AddRemoteInstanceService.addMongodb(data);
      case 'MySQL':
        return AddRemoteInstanceService.addMysql(data);
      case 'ProxySQL':
        return AddRemoteInstanceService.addProxysql(data);
      case 'PostgreSQL':
        return AddRemoteInstanceService.addPostgresql(data);
      default:
        throw new Error('Unknown instance type');
    }
  }
}

export default AddRemoteInstanceService;
