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
}

export interface XtraDBClusterConnection {
  host: string;
  name: string;
  password: string;
  port: number;
  username: string;
}

export interface XtraDBClusterPayload {
  kubernetes_cluster_name: string;
  name: string;
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
