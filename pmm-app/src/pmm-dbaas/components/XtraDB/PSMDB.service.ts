import { omit } from 'lodash';
import { Databases } from 'shared/core';
import { apiRequestManagement } from 'shared/components/helpers/api';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import {
  XtraDBCluster,
  XtraDBClusterPayload,
  DeleteXtraDBClusterAPI,
  XtraDBClusterConnectionAPI,
} from './XtraDB.types';
import { DBClusterService } from './DBCluster.service';

export class PSMDBService extends DBClusterService {
  getDBClusters(kubernetes: Kubernetes): Promise<XtraDBClusterPayload> {
    return apiRequestManagement.post<any, Kubernetes>('/DBaaS/PSMDBClusters/List', kubernetes);
  }

  addDBCluster(xtradbCluster: XtraDBCluster): Promise<void | XtraDBClusterPayload> {
    return apiRequestManagement.post<XtraDBClusterPayload, any>(
      '/DBaaS/PSMDBCluster/Create',
      toAPI(xtradbCluster),
    );
  }

  deleteDBClusters(xtradbCluster: XtraDBCluster): Promise<void> {
    const toAPI = (cluster: XtraDBCluster): DeleteXtraDBClusterAPI => ({
      name: cluster.clusterName,
      kubernetes_cluster_name: xtradbCluster.kubernetesClusterName,
    });

    return apiRequestManagement.post<any, DeleteXtraDBClusterAPI>(
      '/DBaaS/PSMDBCluster/Delete',
      toAPI(xtradbCluster),
    );
  }

  getDBCluster(xtradbCluster: XtraDBCluster): Promise<void | XtraDBClusterConnectionAPI> {
    return apiRequestManagement.post<XtraDBClusterConnectionAPI, any>(
      '/DBaaS/PSMDBClusters/Get',
      omit(toAPI(xtradbCluster), ['params']),
    );
  }

  toModel(
    xtradbCluster: XtraDBClusterPayload,
    kubernetesClusterName: string,
    databaseType: Databases,
  ): XtraDBCluster {
    return {
      clusterName: xtradbCluster.name,
      kubernetesClusterName,
      databaseType,
      clusterSize: xtradbCluster.params.cluster_size,
      memory: xtradbCluster.params.replicaset?.compute_resources?.memory_bytes || 0,
      cpu: xtradbCluster.params.replicaset?.compute_resources?.cpu_m || 0,
      status: xtradbCluster.state,
      errorMessage: xtradbCluster.operation?.message,
    };
  }
}

const toAPI = (xtradbCluster: XtraDBCluster) => ({
  kubernetes_cluster_name: xtradbCluster.kubernetesClusterName,
  name: xtradbCluster.clusterName,
  params: {
    cluster_size: xtradbCluster.clusterSize,
    replicaset: {
      compute_resources: {
        cpu_m: xtradbCluster.cpu * 1000,
        memory_bytes: xtradbCluster.memory * 10 ** 9,
      },
    },
  },
});
