import { Kubernetes } from '../Kubernetes/Kubernetes.types';

export type AddXtraDBAction = (xtradbCluster: XtraDBCluster) => void;
export type GetXtraDBClustersAction = () => void;

export interface XtraDBProps {
  kubernetes: Kubernetes[];
}

export interface XtraDBCluster {
  clusterName: string;
  kubernetesClusterName: string;
  databaseType: string;
  clusterSize: number;
  memory: number;
  cpu: number;
  status?: XtraDBClusterStatus;
  errorMessage?: string;
}

export enum XtraDBClusterStatus {
  invalid = 'XTRA_DB_CLUSTER_STATE_INVALID',
  changing = 'XTRA_DB_CLUSTER_STATE_CHANGING',
  ready = 'XTRA_DB_CLUSTER_STATE_READY',
  failed = 'XTRA_DB_CLUSTER_STATE_FAILED',
  deleting = 'XTRA_DB_CLUSTER_STATE_DELETING',
}

export interface XtraDBClusterConnection {
  host: string;
  password: string;
  port: number;
  username: string;
}

export interface XtraDBClusterPayload {
  kubernetes_cluster_name: string;
  name: string;
  state?: XtraDBClusterStatus;
  operation?: XtraDBClusterOperationAPI;
  params: XtraDBClusterParamsAPI;
}

export interface DeleteXtraDBClusterAPI {
  kubernetes_cluster_name: string;
  name: string;
}

interface XtraDBClusterParamsAPI {
  cluster_size: number;
  pxc: XtraDBClusterContainerAPI;
  proxysql: XtraDBClusterContainerAPI;
}

interface XtraDBClusterContainerAPI {
  compute_resources: XtraDBComputeResourcesAPI;
}

interface XtraDBComputeResourcesAPI {
  cpu_m: number;
  memory_bytes: number;
}

interface XtraDBClusterOperationAPI {
  progress: number;
  message: string;
}

export interface XtraDBClusterConnectionAPI {
  connection_credentials: XtraDBClusterConnection;
}
