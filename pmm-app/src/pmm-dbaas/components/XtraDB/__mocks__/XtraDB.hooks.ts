import { Kubernetes } from 'pmm-dbaas/components/Kubernetes/Kubernetes.types';
import { xtraDBClustersStub, getXtraDBClustersActionStub } from './xtraDBClustersStubs';
import { XtraDBCluster, GetXtraDBClustersAction } from '../XtraDB.types';


export const useXtraDBClusters = (kubernetes: Kubernetes[]): [
  XtraDBCluster[],
  GetXtraDBClustersAction,
  boolean
] => {
  const xtraDBClusters: XtraDBCluster[] = [];

  if (kubernetes.length > 0) {
    xtraDBClusters.push(...xtraDBClustersStub);
  }

  return [xtraDBClusters, getXtraDBClustersActionStub, false];
};
