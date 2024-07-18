import { apiRequest } from 'shared/components/helpers/api';
import { API } from './constants';
import { Settings, SettingsAPIResponse, SettingsPayload } from './types';

export const SettingsService = {
  async getSettings(): Promise<Settings> {
    const { settings } = await apiRequest.get(API.SETTINGS) as SettingsAPIResponse;

    return toModel(settings);
  },
};

const toModel = (response: SettingsPayload): Settings => ({
  updatesEnabled: response.updates_enabled,
});
