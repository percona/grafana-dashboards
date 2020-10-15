import { apiRequestManagement } from 'shared/components/helpers/api';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import { XtraDBCluster, XtraDBClusterAPI } from './XtraDB.types';

export const XtraDBService = {
  getXtraDBClusters(kubernetes: Kubernetes) {
    return apiRequestManagement.post<any, any>('/DBaaS/XtraDBClusters/List', kubernetes);
  },
  addXtraDBCluster(xtradbCluster: XtraDBCluster) {
    return apiRequestManagement.post<XtraDBClusterAPI, any>('/DBaaS/XtraDBCluster/Create', toAPI(xtradbCluster));
  },
};

export const toAPI = (xtradbCluster: XtraDBCluster): XtraDBClusterAPI => ({
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

export const toModel = (xtradbCluster: XtraDBClusterAPI, databaseType: string): XtraDBCluster => ({
  kubernetesClusterName: '',
  clusterName: xtradbCluster.name,
  databaseType,
  clusterSize: xtradbCluster.params.cluster_size,
  memory: xtradbCluster.params.pxc.compute_resources.memory_bytes,
  cpu: xtradbCluster.params.pxc.compute_resources.cpu_m,
});
