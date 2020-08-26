import { apiRequest } from 'shared/components/helpers/api';
import { showSuccessNotification } from 'shared/components/helpers';
import { Messages } from './Settings.messages';
import { Settings } from './Settings.types';

export type LoadingCallback = (value: boolean) => void;
export type SettingsCallback = (settings: Settings) => void;

export const SettingsService = {
  async getSettings(setLoading: LoadingCallback, setSettings: SettingsCallback) {
    let response: any;

    try {
      setLoading(true);
      response = await apiRequest.post<any, any>('/v1/Settings/Get', {});
      setSettings(toModel(response.settings));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

    return response;
  },
  async setSettings(body, setLoading: LoadingCallback) {
    let response: any;

    try {
      setLoading(true);
      response = await apiRequest.post<any, any>('/v1/Settings/Change', body);
      response = toModel(response.settings);
      showSuccessNotification({ message: Messages.service.success });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

    return response;
  },
};

const toModel = (response: any): Settings => ({
  awsPartitions: response.aws_partitions,
  updatesDisabled: response.updates_disabled,
  telemetryEnabled: response.telemetry_enabled,
  metricsResolutions: response.metrics_resolutions,
  dataRetention: response.data_retention,
  sshKey: response.ssh_key,
  alertManagerUrl: response.alert_manager_url,
  alertManagerRules: response.alert_manager_rules,
  sttEnabled: response.stt_enabled,
  platformEmail: response.platform_email,
});
