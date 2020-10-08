import { apiRequestManagement } from 'shared/components/helpers/api';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import { XtraDBCluster, XtraDBClusterAPI, DeleteXtraDBClusterAPI } from './XtraDB.types';

export const XtraDBService = {
  getXtraDBClusters(kubernetes: Kubernetes) {
    return apiRequestManagement.post<any, Kubernetes>('/DBaaS/XtraDBClusters/List', kubernetes);
  },
  addXtraDBCluster(xtradbCluster: XtraDBCluster) {
    return apiRequestManagement.post<XtraDBClusterAPI, any>(
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
};

export const toAPI = (xtradbCluster: XtraDBCluster): XtraDBClusterAPI => ({
  kubernetes_cluster_name: xtradbCluster.kubernetesClusterName,
  name: xtradbCluster.clusterName,
  params: {
    cluster_size: 3,
    pxc: {
      compute_resources: {
        cpu_m: 3,
        memory_bytes: 3072,
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
  xtradbCluster: XtraDBClusterAPI,
  kubernetesClusterName: string,
  databaseType: string,
): XtraDBCluster => ({
  kubernetesClusterName,
  clusterName: xtradbCluster.name,
  databaseType,
});
