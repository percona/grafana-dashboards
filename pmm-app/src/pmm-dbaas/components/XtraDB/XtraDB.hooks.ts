import { useState, useEffect } from 'react';
import {
  processPromiseResults,
  FulfilledPromiseResult,
} from 'shared/components/helpers/promises';
import { DATABASE_LABELS } from 'shared/core';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import { XtraDBCluster, GetXtraDBClustersAction } from './XtraDB.types';
import { XtraDBService, toModel } from './XtraDB.service';

export const useXtraDBClusters = (
  kubernetes: Kubernetes[],
): [XtraDBCluster[], GetXtraDBClustersAction, boolean] => {
  const [xtraDBClusters, setXtraDBClusters] = useState<XtraDBCluster[]>([]);
  const [loading, setLoading] = useState(false);

  const getXtraDBClusters = async () => {
    setLoading(true);

    try {
      const clusters: XtraDBCluster[] = [];
      const requests = kubernetes.map(XtraDBService.getXtraDBClusters);
      const results = await processPromiseResults(requests);

      results.forEach((r, index) => {
        if (r.status === 'fulfilled') {
          const resultClusters = (r as FulfilledPromiseResult).value.clusters;

          resultClusters.forEach((cluster) => {
            clusters.push(toModel(cluster, kubernetes[index].kubernetesClusterName, DATABASE_LABELS.mysql));
          });
        }
      });

      setXtraDBClusters([{}, {}, {}]);
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
