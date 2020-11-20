import { Databases } from 'shared/core';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';

export type AddDBClusterAction = (dbCluster: DBCluster) => void;
export type GetDBClustersAction = () => void;

export interface DBClusterProps {
  kubernetes: Kubernetes[];
}

export interface DBCluster {
  clusterName: string;
  kubernetesClusterName: string;
  databaseType: Databases;
  clusterSize: number;
  memory: number;
  cpu: number;
  disk: number;
  status?: DBClusterStatus;
  errorMessage?: string;
}

export enum DBClusterStatus {
  invalid = 'DB_CLUSTER_STATE_INVALID',
  changing = 'DB_CLUSTER_STATE_CHANGING',
  ready = 'DB_CLUSTER_STATE_READY',
  failed = 'DB_CLUSTER_STATE_FAILED',
  deleting = 'DB_CLUSTER_STATE_DELETING',
}

export type DBClusterStatusMap = {
  [key in DBClusterStatus]: string;
};

export interface DBClusterConnection {
  host: string;
  password: string;
  port: number;
  username: string;
}

export interface DBClusterPayload {
  kubernetes_cluster_name: string;
  name: string;
  state?: DBClusterStatus;
  operation?: DBClusterOperationAPI;
  params: DBClusterParamsAPI;
}

export interface DeleteDBClusterAPI {
  kubernetes_cluster_name: string;
  name: string;
}

export interface RestartDBClusterAPI {
  kubernetes_cluster_name: string;
  name: string;
}

interface DBClusterParamsAPI {
  cluster_size: number;
  pxc?: DBClusterContainerAPI;
  proxysql?: DBClusterContainerAPI;
  replicaset?: DBClusterContainerAPI;
}

interface DBClusterContainerAPI {
  compute_resources: DBClusterComputeResourcesAPI;
  disk_size: number;
}

interface DBClusterComputeResourcesAPI {
  cpu_m: number;
  memory_bytes: number;
}

interface DBClusterOperationAPI {
  progress: number;
  message: string;
}

export interface DBClusterConnectionAPI {
  connection_credentials: DBClusterConnection;
}
