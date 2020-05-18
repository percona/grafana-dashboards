export interface CheckPanelOptions {
  title: string;
}

export enum Severity {
  error = 'error',
  warning = 'warning',
  notice = 'notice',
}

export type SeverityMap = Record<Severity, string>;

export type FailedChecks = [number, number, number];

export interface ActiveCheck {
  key: string;
  name: string;
  failed: FailedChecks;
  details: string[];
}

export interface Alert {
  annotations: {
    description: string;
    summary: string;
  };
  labels: {
    stt_check?: string;
    service_name: string;
    severity: Severity;
  };
}

export interface AlertRequestParams {
  active?: boolean;
  silenced?: boolean;
  filter?: string;
}

export interface Settings {
  settings: {
    stt_enabled?: boolean;
    telemetry_enabled?: boolean;
  };
}
