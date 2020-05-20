import { apiRequestManagement } from '../../react-plugins-deps/components/helpers/api';

class DiscoveryService {
  static async discoveryRDS(body) {
    return apiRequestManagement.post<any, any>('/RDS/Discover', body);
  }
}

export default DiscoveryService;
