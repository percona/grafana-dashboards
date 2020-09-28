import { apiRequestManagement } from 'shared/components/helpers/api';
import { XtraDBCluster, XtraDBClusterAPI } from './XtraDB.types';

export const XtraDBService = {
  addXtraDBCluster(xtradbCluster: XtraDBCluster) {
    return apiRequestManagement.post<XtraDBClusterAPI, any>('/DBaaS/XtraDBCluster/Create', toAPI(xtradbCluster));
  },
};

const toAPI = (xtradbCluster: XtraDBCluster): XtraDBClusterAPI => ({
  kubernetes_cluster_name: xtradbCluster.kubernetesClusterName,
  name: xtradbCluster.clusterName,
  params: {
    cluster_size: 3,
    pxc: {
      compute_resources: {
        cpu_m: 3,
        memory_bytes: 256
      }
    },
    proxysql: {
      compute_resources: {
        cpu_m: 3,
        memory_bytes: 256
      }
    }
  }
});
