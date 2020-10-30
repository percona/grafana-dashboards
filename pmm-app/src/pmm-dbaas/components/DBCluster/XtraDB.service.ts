import { omit } from 'lodash';
import { Databases } from 'shared/core';
import { apiRequestManagement } from 'shared/components/helpers/api';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import {
  DBCluster,
  DBClusterPayload,
  DeleteDBClusterAPI,
  DBClusterConnectionAPI,
} from './DBCluster.types';
import { DBClusterService } from './DBCluster.service';

export class XtraDBService extends DBClusterService {
  getDBClusters(kubernetes: Kubernetes): Promise<DBClusterPayload> {
    return apiRequestManagement.post<any, Kubernetes>('/DBaaS/XtraDBClusters/List', kubernetes);
  }

  addDBCluster(dbCluster: DBCluster): Promise<void | DBClusterPayload> {
    return apiRequestManagement.post<DBClusterPayload, any>(
      '/DBaaS/XtraDBCluster/Create',
      toAPI(dbCluster),
    );
  }

  deleteDBClusters(dbCluster: DBCluster): Promise<void> {
    const toAPI = (cluster: DBCluster): DeleteDBClusterAPI => ({
      name: cluster.clusterName,
      kubernetes_cluster_name: dbCluster.kubernetesClusterName,
    });

    return apiRequestManagement.post<any, DeleteDBClusterAPI>(
      '/DBaaS/XtraDBCluster/Delete',
      toAPI(dbCluster),
    );
  }

  getDBCluster(dbCluster: DBCluster): Promise<void | DBClusterConnectionAPI> {
    return apiRequestManagement.post<DBClusterConnectionAPI, any>(
      '/DBaaS/XtraDBClusters/Get',
      omit(toAPI(dbCluster), ['params']),
    );
  }

  toModel(
    dbCluster: DBClusterPayload,
    kubernetesClusterName: string,
    databaseType: Databases,
  ): DBCluster {
    return {
      clusterName: dbCluster.name,
      kubernetesClusterName,
      databaseType,
      clusterSize: dbCluster.params.cluster_size,
      memory: dbCluster.params.pxc?.compute_resources?.memory_bytes || 0,
      cpu: dbCluster.params.pxc?.compute_resources?.cpu_m || 0,
      status: dbCluster.state,
      errorMessage: dbCluster.operation?.message,
    };
  }
}

const toAPI = (dbCluster: DBCluster): DBClusterPayload => ({
  kubernetes_cluster_name: dbCluster.kubernetesClusterName,
  name: dbCluster.clusterName,
  params: {
    cluster_size: dbCluster.clusterSize,
    pxc: {
      compute_resources: {
        cpu_m: dbCluster.cpu * 1000,
        memory_bytes: dbCluster.memory * 10 ** 9,
      },
    },
    proxysql: {
      compute_resources: {
        cpu_m: 0,
        memory_bytes: 0,
      },
    },
  },
});
