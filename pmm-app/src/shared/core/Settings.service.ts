import { apiRequest } from 'shared/components/helpers/api';
import { API } from './constants';
import { Settings, SettingsAPIResponse, SettingsPayload } from './types';

export const SettingsService = {
  async getSettings(disableNotifications = false): Promise<Settings> {
    const { settings } = await apiRequest.post(API.SETTINGS, {}, disableNotifications) as SettingsAPIResponse;

    return toModel(settings);
  },
};

const toModel = (response: SettingsPayload): Settings => ({
  updatesDisabled: response.updates_disabled,
});
