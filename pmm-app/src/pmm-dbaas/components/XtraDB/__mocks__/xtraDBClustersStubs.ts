import { Databases } from 'shared/core';
import { XtraDBCluster, XtraDBClusterConnection, XtraDBClusterStatus } from '../XtraDB.types';


export const xtraDBClustersStub: XtraDBCluster[] = [
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
    status: XtraDBClusterStatus.ready,
  },
];

export const xtraDBClusterConnectionStub: XtraDBClusterConnection = {
  host: 'dbcluster-proxysql',
  password: '1234',
  port: 3000,
  username: 'root',
};

export const mongoDBClusterConnectionStub: XtraDBClusterConnection = {
  host: 'dbcluster-psmdb',
  password: '1234',
  port: 3000,
  username: 'root',
};

export const getXtraDBClustersActionStub = jest.fn();
