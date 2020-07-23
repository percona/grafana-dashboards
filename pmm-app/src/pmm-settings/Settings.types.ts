export interface Settings {
  updatesDisabled: boolean;
  telemetryEnabled: boolean;
  metricsResolutions: MetricsResolutions;
  dataRetention: string;
  sshKey: string;
  awsPartitions: string[];
  alertManagerUrl: string;
  alertManagerRules: string;
  sttEnabled: boolean
}

export interface MetricsResolutions {
  hr: string;
  mr: string;
  lr: string;
}
