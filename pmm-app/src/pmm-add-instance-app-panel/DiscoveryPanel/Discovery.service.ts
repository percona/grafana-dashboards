import { apiRequestManagement } from '../../shared/components/helpers/api';

class DiscoveryService {
  static async discoveryRDS(body) {
    return apiRequestManagement.post<any, any>('/RDS/Discover', body);
  }
}

export default DiscoveryService;
