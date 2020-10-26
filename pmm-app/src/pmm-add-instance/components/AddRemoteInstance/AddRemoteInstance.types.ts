export enum TrackingOptions {
  none = '',
  pgStatements = 'qan_postgresql_pgstatements_agent',
  pgMonitor = 'qan_postgresql_pgstatmonitor_agent',
}

export interface InstanceData {
  instanceType?: string;
  defaultPort?: number;
  remoteInstanceCredentials?: any;
  discoverName?: string;
}

interface Instance {
  type: string;
  credentials?: any;
}

export interface AddRemoteInstanceProps {
  instance: Instance;
}
