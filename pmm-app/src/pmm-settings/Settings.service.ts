import { apiRequestSettings } from '../react-plugins-deps/helpers/api';

class SettingsService {
  static async getSettings() {
    return apiRequestSettings.post<any, any>('/Get', {});
  }
  static async setSettings(body) {
    return apiRequestSettings.post<any, any>('/Change', body);
  }
}

export default SettingsService;
