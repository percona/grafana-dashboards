import { Databases } from 'shared/core';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import {
  XtraDBCluster,
  XtraDBClusterPayload,
  XtraDBClusterConnectionAPI,
} from './XtraDB.types';

export abstract class DBClusterService {
  abstract getDBClusters(kubernetes: Kubernetes): Promise<XtraDBClusterPayload>;

  abstract addDBCluster(xtradbCluster: XtraDBCluster): Promise<void | XtraDBClusterPayload> ;

  abstract deleteDBClusters(xtradbCluster: XtraDBCluster): Promise<void>;

  abstract getDBCluster(xtradbCluster: XtraDBCluster): Promise<void | XtraDBClusterConnectionAPI>;

  abstract toModel(
    xtradbCluster: XtraDBClusterPayload,
    kubernetesClusterName: string,
    databaseType: Databases,
  ): XtraDBCluster;
}
