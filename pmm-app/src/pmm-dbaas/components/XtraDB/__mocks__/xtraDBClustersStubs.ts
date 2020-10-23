import { Databases } from 'shared/core';
import { XtraDBCluster, XtraDBClusterConnection } from '../XtraDB.types';


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
];

export const xtraDBClusterConnectionStub: XtraDBClusterConnection = {
  host: 'dbcluster-proxysql',
  name: 'dbcluster',
  password: '1234',
  port: 3000,
  username: 'root',
};

export const getXtraDBClustersActionStub = jest.fn();
