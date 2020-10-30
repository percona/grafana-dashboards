import { useState, useEffect } from 'react';
import { processPromiseResults, FulfilledPromiseResult } from 'shared/components/helpers/promises';
import { Databases } from 'shared/core';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import { XtraDBCluster, GetXtraDBClustersAction, XtraDBClusterPayload } from './XtraDB.types';
import { isClusterChanging } from './XtraDB.utils';
import { DBClusterServiceFactory } from './DBClusterService.factory';

const RECHECK_INTERVAL = 30000;
const DATABASES = [
  Databases.mysql,
  Databases.mongodb,
];

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
      const requests = DATABASES.map((database) => getDBClusters(kubernetes, database));
      const results = await Promise.all(requests);
      const clustersList = results.reduce((acc, r) => acc.concat(r), []);

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

const getDBClusters = async (kubernetes: Kubernetes[], databaseType: Databases): Promise<XtraDBCluster[]> => {
  const dbClusterService = DBClusterServiceFactory.newDBClusterService(databaseType);
  const requests = kubernetes.map(dbClusterService.getDBClusters);
  const results = await processPromiseResults(requests);

  const clustersList: XtraDBCluster[] = results.reduce((acc: XtraDBCluster[], r, index) => {
    if (r.status !== 'fulfilled') {
      return acc;
    }

    const clusters: XtraDBClusterPayload[] = (r as FulfilledPromiseResult).value?.clusters ?? [];

    const resultClusters = clusters.map(
      (cluster) => dbClusterService.toModel(
        cluster,
        kubernetes[index].kubernetesClusterName,
        databaseType,
      ),
    );

    return acc.concat(resultClusters);
  }, []);

  return clustersList;
};
