import { apiRequestQAN } from '../react-plugins-deps/components/helpers/api';

class SettingsService {
  static async getSettings() {
    return apiRequestQAN.post<any, any>('/v1/Settings/Get', {});
  }
  static async setSettings(body) {
    return apiRequestQAN.post<any, any>('/v1/Settings/Change', body);
  }
}

export default SettingsService;
