import { omit } from 'lodash';
import { Databases } from 'shared/core';
import { apiRequestManagement } from 'shared/components/helpers/api';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import {
  DBCluster,
  DBClusterActionAPI,
  DBClusterConnectionAPI,
  DBClusterPayload,
  DBClusterStatus,
} from './DBCluster.types';
import { DBClusterService } from './DBCluster.service';
import { getClusterStatus } from './DBCluster.utils';

const DBCLUSTER_STATUS_MAP = {
  [DBClusterStatus.invalid]: 'PSMDB_CLUSTER_STATE_INVALID',
  [DBClusterStatus.changing]: 'PSMDB_CLUSTER_STATE_CHANGING',
  [DBClusterStatus.ready]: 'PSMDB_CLUSTER_STATE_READY',
  [DBClusterStatus.failed]: 'PSMDB_CLUSTER_STATE_FAILED',
  [DBClusterStatus.deleting]: 'PSMDB_CLUSTER_STATE_DELETING',
  [DBClusterStatus.suspended]: 'PSMDB_CLUSTER_STATE_SUSPENDED',
};

export class PSMDBService extends DBClusterService {
  getDBClusters(kubernetes: Kubernetes): Promise<DBClusterPayload> {
    return apiRequestManagement.post<any, Kubernetes>('/DBaaS/PSMDBClusters/List', kubernetes);
  }

  addDBCluster(dbCluster: DBCluster): Promise<void | DBClusterPayload> {
    return apiRequestManagement.post<DBClusterPayload, any>(
      '/DBaaS/PSMDBCluster/Create',
      toAPI(dbCluster),
    );
  }

  updateDBCluster(dbCluster: DBCluster): Promise<void | DBClusterPayload> {
    return apiRequestManagement.post<DBClusterPayload, any>(
      '/DBaaS/PSMDBCluster/Update',
      toAPI(dbCluster),
    );
  }

  deleteDBClusters(dbCluster: DBCluster): Promise<void> {
    const toAPI = (cluster: DBCluster): DBClusterActionAPI => ({
      name: cluster.clusterName,
      kubernetes_cluster_name: dbCluster.kubernetesClusterName,
    });

    return apiRequestManagement.post<any, DBClusterActionAPI>(
      '/DBaaS/PSMDBCluster/Delete',
      toAPI(dbCluster),
    );
  }

  getDBCluster(dbCluster: DBCluster): Promise<void | DBClusterConnectionAPI> {
    return apiRequestManagement.post<DBClusterConnectionAPI, any>(
      '/DBaaS/PSMDBClusters/Get',
      omit(toAPI(dbCluster), ['params']),
    );
  }

  restartDBCluster(dbCluster: DBCluster): Promise<void> {
    return apiRequestManagement.post<any, DBClusterActionAPI>(
      '/DBaaS/PSMDBCluster/Restart',
      omit(toAPI(dbCluster), ['params']),
    );
  }

  suspend(dbCluster: DBCluster): Promise<void> {
    return apiRequestManagement.post<any, DBClusterActionAPI>(
      '/DBaaS/PSMDBCluster/Suspend',
      omit(toAPI(dbCluster), ['params']),
    );
  }

  resume(dbCluster: DBCluster): Promise<void> {
    return apiRequestManagement.post<any, DBClusterActionAPI>(
      '/DBaaS/PSMDBCluster/Resume',
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
      memory: (dbCluster.params.replicaset?.compute_resources?.memory_bytes || 0) / 10 ** 9,
      cpu: (dbCluster.params.replicaset?.compute_resources?.cpu_m || 0) / 1000,
      disk: (dbCluster.params.replicaset?.disk_size || 0) / 10 ** 9,
      status: getClusterStatus(dbCluster.state, DBCLUSTER_STATUS_MAP),
      errorMessage: dbCluster.operation?.message,
    };
  }
}

const toAPI = (dbCluster: DBCluster) => ({
  kubernetes_cluster_name: dbCluster.kubernetesClusterName,
  name: dbCluster.clusterName,
  params: {
    cluster_size: dbCluster.clusterSize,
    replicaset: {
      compute_resources: {
        cpu_m: dbCluster.cpu * 1000,
        memory_bytes: dbCluster.memory * 10 ** 9,
      },
      disk_size: dbCluster.disk * 10 ** 9,
    },
  },
});
