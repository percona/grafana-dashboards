import { apiRequest } from 'shared/components/helpers/api';
import { showSuccessNotification } from 'shared/components/helpers';
import { Messages } from './Settings.messages';
import { Settings } from './Settings.types';

export type LoadingCallback = (value: boolean) => void;

export const SettingsService = {
  async getSettings(callback: LoadingCallback) {
    let response: any = null;

    try {
      callback(true);
      response = await apiRequest.post<any, any>('/v1/Settings/Get', {});
      response = toModel(response.settings);
    } catch (e) {
      console.error(e);
    } finally {
      callback(false);
    }

    return response;
  },
  async setSettings(body, callback: LoadingCallback) {
    let response: any = null;

    try {
      callback(true);
      response = await apiRequest.post<any, any>('/v1/Settings/Change', body);
      response = toModel(response.settings);
      showSuccessNotification({ message: Messages.service.success });
    } catch (e) {
      console.error(e);
    } finally {
      callback(false);
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
  sttEnabled: response.stt_enabled
});
