import { apiRequest } from '../../../react-plugins-deps/components/helpers/api';

class AddRemoteInstanceService {
  static async addMysql(body) {
    return apiRequest.post<any, any>('/v1/management/MySQL/Add', body);
  }

  static async addPostgresql(body) {
    return apiRequest.post<any, any>('/v1/management/PostgreSQL/Add', body);
  }

  static async addProxysql(body) {
    return apiRequest.post<any, any>('/v1/management/ProxySQL/Add', body);
  }

  static async addMongodb(body) {
    return apiRequest.post<any, any>('/v1/management/MongoDB/Add', body);
  }

  static async addRDS(body) {
    return apiRequest.post<any, any>('/v1/management/RDS/Add', body);
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
