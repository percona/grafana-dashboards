import { Databases } from 'shared/core';
import { XtraDBCluster } from '../XtraDB.types';


export const xtraDBClustersStub: XtraDBCluster[] = [
  {
    kubernetesClusterName: 'Kubernetes Cluster 1',
    clusterName: 'dbcluster1',
    databaseType: Databases.mysql,
  },
  {
    kubernetesClusterName: 'Kubernetes Cluster 2',
    clusterName: 'dbcluster2',
    databaseType: Databases.mysql,
  },
];

export const getXtraDBClustersActionStub = jest.fn();
