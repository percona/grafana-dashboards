import { useState, useEffect } from 'react';
import { processPromiseResults, FulfilledPromiseResult } from 'shared/components/helpers/promises';
import { DATABASE_LABELS } from 'shared/core';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import { XtraDBCluster, GetXtraDBClustersAction, XtraDBClusterPayload } from './XtraDB.types';
import { XtraDBService, toModel } from './XtraDB.service';

export const useXtraDBClusters = (
  kubernetes: Kubernetes[],
): [XtraDBCluster[], GetXtraDBClustersAction, boolean] => {
  const [xtraDBClusters, setXtraDBClusters] = useState<XtraDBCluster[]>([]);
  const [loading, setLoading] = useState(false);

  const getXtraDBClusters = async () => {
    setLoading(true);

    try {
      const requests = kubernetes.map(XtraDBService.getXtraDBClusters);
      const results = await processPromiseResults(requests);

      const clustersList: XtraDBCluster[] = results.reduce((clusters: XtraDBCluster[], r, index) => {
        if (r.status !== 'fulfilled') {
          return clusters;
        }

        const resultClusters: XtraDBClusterPayload[] = (r as FulfilledPromiseResult).value?.clusters ?? [];

        const result = resultClusters.map(
          (cluster) => toModel(cluster, kubernetes[index].kubernetesClusterName, DATABASE_LABELS.mysql)
        );

        return clusters.concat(result);
      }, []);

      setXtraDBClusters(clustersList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getXtraDBClusters();
  }, []);

  return [xtraDBClusters, getXtraDBClusters, loading];
};
