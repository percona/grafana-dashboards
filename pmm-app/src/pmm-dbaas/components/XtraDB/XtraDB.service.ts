import { apiRequestManagement } from 'shared/components/helpers/api';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import { XtraDBCluster, XtraDBClusterAPI } from './XtraDB.types';

export const XtraDBService = {
  getXtraDBClusters(kubernetes: Kubernetes) {
    return apiRequestManagement.post<any, any>('/DBaaS/XtraDBClusters/List', kubernetes);
  },
  addXtraDBCluster(xtradbCluster: XtraDBCluster) {
    return apiRequestManagement.post<XtraDBClusterAPI, any>(
      '/DBaaS/XtraDBCluster/Create',
      toAPI(xtradbCluster),
    );
  },
  deleteXtraDBClusters(xtradbCluster) {
    const toAPI = (cluster) => ({
      name: cluster.clusterName,
    });

    return apiRequestManagement.post<any, any>('/DBaaS/XtraDBCluster/Delete', toAPI(xtradbCluster));
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

export const toModel = (xtradbCluster: XtraDBClusterAPI, databaseType: string): XtraDBCluster => ({
  kubernetesClusterName: '',
  clusterName: xtradbCluster.name,
  databaseType,
});
