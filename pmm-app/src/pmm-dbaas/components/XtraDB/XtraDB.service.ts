import { omit } from 'lodash';
import { apiRequestManagement } from 'shared/components/helpers/api';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import {
  XtraDBCluster,
  XtraDBClusterPayload,
  DeleteXtraDBClusterAPI,
  XtraDBClusterConnection,
} from './XtraDB.types';

export const XtraDBService = {
  getXtraDBClusters(kubernetes: Kubernetes) {
    return apiRequestManagement.post<any, Kubernetes>('/DBaaS/XtraDBClusters/List', kubernetes);
  },
  addXtraDBCluster(xtradbCluster: XtraDBCluster) {
    return apiRequestManagement.post<XtraDBClusterPayload, any>(
      '/DBaaS/XtraDBCluster/Create',
      toAPI(xtradbCluster),
    );
  },
  deleteXtraDBClusters(xtradbCluster: XtraDBCluster) {
    const toAPI = (cluster: XtraDBCluster): DeleteXtraDBClusterAPI => ({
      name: cluster.clusterName,
      kubernetes_cluster_name: xtradbCluster.kubernetesClusterName,
    });

    return apiRequestManagement.post<any, DeleteXtraDBClusterAPI>(
      '/DBaaS/XtraDBCluster/Delete',
      toAPI(xtradbCluster),
    );
  },
  showXtraDBCluster(xtradbCluster: XtraDBCluster) {
    return apiRequestManagement.post<XtraDBClusterConnection, any>(
      '/DBaaS/XtraDBClusters/Show',
      omit(toAPI(xtradbCluster), ['params']),
    );
  },
};

const toAPI = (xtradbCluster: XtraDBCluster): XtraDBClusterPayload => ({
  kubernetes_cluster_name: xtradbCluster.kubernetesClusterName,
  name: xtradbCluster.clusterName,
  params: {
    cluster_size: xtradbCluster.clusterSize,
    pxc: {
      compute_resources: {
        cpu_m: xtradbCluster.cpu,
        memory_bytes: xtradbCluster.memory * 1024,
      },
    },
    proxysql: {
      compute_resources: {
        cpu_m: 1,
        memory_bytes: 1024,
      },
    },
  },
});

export const toModel = (
  xtradbCluster: XtraDBClusterPayload,
  kubernetesClusterName: string,
  databaseType: string,
): XtraDBCluster => ({
  clusterName: xtradbCluster.name,
  kubernetesClusterName,
  databaseType,
  clusterSize: xtradbCluster.params.cluster_size,
  memory: xtradbCluster.params.pxc?.compute_resources?.memory_bytes,
  cpu: xtradbCluster.params.pxc?.compute_resources?.cpu_m,
});
