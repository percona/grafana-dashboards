import { apiRequest } from '../react-plugins-deps/components/helpers/api';

/**
 * Just a service-like object to store the API methods
 */
export const CheckService = {
  async getAlerts() {
    return apiRequest.post<any, any>('/v1/Settings/Get', {});
  },
};
