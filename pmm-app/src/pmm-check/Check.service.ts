import { apiRequest } from '../react-plugins-deps/components/helpers/api';
import { BASER_URL } from './CheckPanel.constants';

const makeApiUrl: (segment: string) => string = segment => `${BASER_URL}/${segment}`;

/**
 * A service-like object to store the API methods
 */
export const CheckService = {
  async getActiveAlerts() {
    return apiRequest.get<string, any>(makeApiUrl('alerts'), { params: { filter: 'node_name=pmm-server' } });
  },
};
