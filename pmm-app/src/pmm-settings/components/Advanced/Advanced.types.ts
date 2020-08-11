import { LoadingCallback } from 'pmm-settings/Settings.service';

export interface AdvancedProps {
  dataRetention: string;
  telemetryEnabled: boolean;
  sttEnabled: boolean;
  updatesDisabled: boolean;
  updateSettings: (body: any, callback: LoadingCallback) => void;
}
