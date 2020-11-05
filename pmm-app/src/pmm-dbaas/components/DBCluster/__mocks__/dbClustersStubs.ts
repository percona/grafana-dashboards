import { Databases } from 'shared/core';
import { DBCluster, DBClusterConnection, DBClusterStatus } from '../DBCluster.types';


export const dbClustersStub: DBCluster[] = [
  {
    kubernetesClusterName: 'Kubernetes Cluster 1',
    clusterName: 'dbcluster1',
    databaseType: Databases.mysql,
    clusterSize: 3,
    memory: 1024,
    cpu: 1,
  },
  {
    kubernetesClusterName: 'Kubernetes Cluster 2',
    clusterName: 'dbcluster2',
    databaseType: Databases.mysql,
    clusterSize: 7,
    memory: 2048,
    cpu: 4,
  },
  {
    kubernetesClusterName: 'Kubernetes Cluster 1',
    clusterName: 'mongodbcluster1',
    databaseType: Databases.mongodb,
    clusterSize: 3,
    memory: 0,
    cpu: 0,
    status: DBClusterStatus.ready,
  },
];

export const xtraDBClusterConnectionStub: DBClusterConnection = {
  host: 'dbcluster-proxysql',
  password: '1234',
  port: 3000,
  username: 'root',
};

export const mongoDBClusterConnectionStub: DBClusterConnection = {
  host: 'dbcluster-psmdb',
  password: '1234',
  port: 3000,
  username: 'root',
};

export const getDBClustersActionStub = jest.fn();
