export interface Settings {
  updatesDisabled: boolean;
  telemetryEnabled: boolean;
  metricsResolutions: MetricsResolutions;
  dataRetention: string;
  sshKey: string;
  awsPartitions: string[];
  alertManagerUrl: string;
  alertManagerRules: string;
  sttEnabled: boolean;
  saasUserEmail?: string;
}

export interface MetricsResolutions {
  hr: string;
  mr: string;
  lr: string;
}

export enum TabKeys {
  metrics = 'metrics-resolution',
  advanced = 'advanced-settings',
  ssh = 'ssh-key',
  alertManager = 'am-integration',
  perconaPlatform = 'perconaPlatform',
}
