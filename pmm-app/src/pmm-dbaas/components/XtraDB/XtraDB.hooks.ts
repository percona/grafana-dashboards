import { useState, useEffect } from 'react';
import { processPromiseResults, FulfilledPromiseResult } from 'shared/components/helpers/promises';
import { DATABASE_LABELS } from 'shared/core';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import { XtraDBCluster, GetXtraDBClustersAction, XtraDBClusterPayload } from './XtraDB.types';
import { XtraDBService, toModel } from './XtraDB.service';
import { isClusterChanging } from './XtraDB.utils';

const RECHECK_INTERVAL = 30000;

export const useXtraDBClusters = (
  kubernetes: Kubernetes[],
): [XtraDBCluster[], GetXtraDBClustersAction, boolean] => {
  const [xtraDBClusters, setXtraDBClusters] = useState<XtraDBCluster[]>([]);
  const [loading, setLoading] = useState(false);
  let timer: NodeJS.Timeout;

  const getXtraDBClusters = async (triggerLoading = true) => {
    if (triggerLoading) {
      setLoading(true);
    }

    try {
      const requests = kubernetes.map(XtraDBService.getXtraDBClusters);
      const results = await processPromiseResults(requests);

      const clustersList: XtraDBCluster[] = results.reduce((acc: XtraDBCluster[], r, index) => {
        if (r.status !== 'fulfilled') {
          return acc;
        }

        const clusters: XtraDBClusterPayload[] = (r as FulfilledPromiseResult).value?.clusters ?? [];

        const resultClusters = clusters.map(
          (cluster) => toModel(cluster, kubernetes[index].kubernetesClusterName, DATABASE_LABELS.mysql),
        );

        return acc.concat(resultClusters);
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

  useEffect(() => {
    // clear timer to prevent parallel requests when get is called from outside hook
    if (timer) {
      clearTimeout(timer);
    }

    // if there are clusters changing, recheck
    if (xtraDBClusters.find((cluster) => isClusterChanging(cluster))) {
      timer = setTimeout(() => getXtraDBClusters(false), RECHECK_INTERVAL);
    }
  }, [xtraDBClusters]);

  return [xtraDBClusters, getXtraDBClusters, loading];
};
