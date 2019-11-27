import { apiRequest } from '../../react-plugins-deps/components/helpers/api';

class DiscoveryService {
  static async discoveryRDS(body) {
    return apiRequest.post<any, any>('/v1/management/RDS/Discover', body);
  }
}

export default DiscoveryService;
