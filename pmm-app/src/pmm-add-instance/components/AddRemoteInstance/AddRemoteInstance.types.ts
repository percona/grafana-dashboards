import { RemoteInstanceCredentials } from 'pmm-add-instance/panel.types';

export enum TrackingOptions {
  none = 'none',
  pgStatements = 'qan_postgresql_pgstatements_agent',
  pgMonitor = 'qan_postgresql_pgstatmonitor_agent',
}

export interface InstanceData {
  instanceType?: string;
  defaultPort?: number;
  remoteInstanceCredentials: RemoteInstanceCredentials;
  discoverName?: string;
}

interface Instance {
  type: string;
  credentials?: any;
}

export interface AddRemoteInstanceProps {
  instance: Instance;
  selectInstance: (Instance) => void;
}

export interface AddNode {
  node_name: string;
  node_type: string;
}

export interface RemoteInstanceExternalservicePayload {
  custom_labels: {};
  service_name: string;
  address?: string;
  add_node: AddNode;
  listen_port: string;
  metrics_mode: number;
}
