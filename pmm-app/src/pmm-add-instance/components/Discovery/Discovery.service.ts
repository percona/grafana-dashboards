import { apiRequestManagement } from 'shared/components/helpers/api';
import { CredentialsForm } from './components/Credentials/Credentials.types';
import { RDSInstances } from './Discovery.types';

class DiscoveryService {
  static async discoveryRDS({ aws_access_key, aws_secret_key }: CredentialsForm) {
    return apiRequestManagement.post<RDSInstances, CredentialsForm>('/RDS/Discover', {
      aws_access_key,
      aws_secret_key,
    });
  }
}

export default DiscoveryService;
