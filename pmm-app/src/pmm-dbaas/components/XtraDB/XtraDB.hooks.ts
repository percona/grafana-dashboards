import { useState, useEffect } from 'react';
import { processPromiseResults, filterFulfilled, FulfilledPromiseResult } from 'shared/components/helpers/promises';
import { DATABASE_LABELS } from 'shared/core';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import { XtraDBCluster, GetXtraDBClustersAction } from './XtraDB.types';
import { XtraDBService, toModel } from './XtraDB.service';

export const useXtraDBClusters = (kubernetes: Kubernetes[]): [
  XtraDBCluster[],
  GetXtraDBClustersAction,
  boolean
] => {
  const [xtraDBClusters, setXtraDBClusters] = useState<XtraDBCluster[]>([]);
  const [loading, setLoading] = useState(false);

  const getXtraDBClusters = async () => {
    setLoading(true);

    try {
      const clusters: XtraDBCluster[] = [];
      const requests = kubernetes.map(XtraDBService.getXtraDBClusters);
      const results = await processPromiseResults(requests);

      results
        .filter(filterFulfilled)
        .map((r) => ((r as FulfilledPromiseResult).value.clusters)
          .map(
            (cluster) => clusters.push(toModel(cluster, DATABASE_LABELS.mysql))
          ));

      setXtraDBClusters(clusters);
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
