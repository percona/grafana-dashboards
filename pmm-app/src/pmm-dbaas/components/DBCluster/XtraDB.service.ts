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
  [DBClusterStatus.invalid]: 'XTRA_DB_CLUSTER_STATE_INVALID',
  [DBClusterStatus.changing]: 'XTRA_DB_CLUSTER_STATE_CHANGING',
  [DBClusterStatus.ready]: 'XTRA_DB_CLUSTER_STATE_READY',
  [DBClusterStatus.failed]: 'XTRA_DB_CLUSTER_STATE_FAILED',
  [DBClusterStatus.deleting]: 'XTRA_DB_CLUSTER_STATE_DELETING',
  [DBClusterStatus.suspended]: 'XTRA_DB_CLUSTER_STATE_SUSPENDED',
};

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

  updateDBCluster(dbCluster: DBCluster): Promise<void | DBClusterPayload> {
    return apiRequestManagement.post<DBClusterPayload, any>(
      '/DBaaS/XtraDBCluster/Update',
      toAPI(dbCluster),
    );
  }

  deleteDBClusters(dbCluster: DBCluster): Promise<void> {
    const toAPI = (cluster: DBCluster): DBClusterActionAPI => ({
      name: cluster.clusterName,
      kubernetes_cluster_name: dbCluster.kubernetesClusterName,
    });

    return apiRequestManagement.post<any, DBClusterActionAPI>(
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

  restartDBCluster(dbCluster: DBCluster): Promise<void> {
    return apiRequestManagement.post<any, DBClusterActionAPI>(
      '/DBaaS/XtraDBCluster/Restart',
      omit(toAPI(dbCluster), ['params']),
    );
  }

  suspend(dbCluster: DBCluster): Promise<void> {
    return apiRequestManagement.post<any, DBClusterActionAPI>(
      '/DBaaS/XtraDBCluster/Suspend',
      omit(toAPI(dbCluster), ['params']),
    );
  }

  resume(dbCluster: DBCluster): Promise<void> {
    return apiRequestManagement.post<any, DBClusterActionAPI>(
      '/DBaaS/XtraDBCluster/Resume',
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
      memory: (dbCluster.params.pxc?.compute_resources?.memory_bytes || 0) / 10 ** 9,
      cpu: (dbCluster.params.pxc?.compute_resources?.cpu_m || 0) / 1000,
      disk: (dbCluster.params.pxc?.disk_size || 0) / 10 ** 9,
      status: getClusterStatus(dbCluster.state, DBCLUSTER_STATUS_MAP),
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
      disk_size: dbCluster.disk * 10 ** 9,
    },
    // Temporary mock data
    proxysql: {
      compute_resources: {
        cpu_m: 1000,
        memory_bytes: 2 * 10 ** 9,
      },
      disk_size: 1 * 10 ** 9,
    },
  },
});
