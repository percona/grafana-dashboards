import { apiRequestManagement } from 'shared/components/helpers/api';

class DiscoveryService {
  static async discoveryRDS({ aws_access_key, aws_secret_key }) {
    return apiRequestManagement.post<any, any>('/RDS/Discover', {
      aws_access_key,
      aws_secret_key,
    });
  }
}

export default DiscoveryService;
