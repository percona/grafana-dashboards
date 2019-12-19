import { apiRequest } from '../react-plugins-deps/components/helpers/api';

class SettingsService {
  static async getSettings() {
    return apiRequest.post<any, any>('/v1/Settings/Get', {});
  }
  static async setSettings(body) {
    return apiRequest.post<any, any>('/v1/Settings/Change', body);
  }
}

export default SettingsService;
