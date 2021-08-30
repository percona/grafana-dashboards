import { Settings } from '../types';

export const SettingsService = {
  async getSettings(): Promise<Settings> {
    return Promise.resolve({ updatesDisabled: false });
  },
};
