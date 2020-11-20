import { useState, useEffect } from 'react';
import { processPromiseResults, FulfilledPromiseResult } from 'shared/components/helpers/promises';
import { Databases } from 'shared/core';
import { Kubernetes } from '../Kubernetes/Kubernetes.types';
import { DBCluster, GetDBClustersAction, DBClusterPayload } from './DBCluster.types';
import { DBClusterServiceFactory } from './DBClusterService.factory';

const RECHECK_INTERVAL = 10000;
const DATABASES = [
  Databases.mysql,
  Databases.mongodb,
];

export const useDBClusters = (
  kubernetes: Kubernetes[],
): [DBCluster[], GetDBClustersAction, boolean] => {
  const [dbClusters, setDBClusters] = useState<DBCluster[]>([]);
  const [loading, setLoading] = useState(false);
  let timer: NodeJS.Timeout;

  const getDBClusters = async (triggerLoading = true) => {
    if (triggerLoading) {
      setLoading(true);
    }

    try {
      const requests = DATABASES.map((database) => getClusters(kubernetes, database));
      const results = await Promise.all(requests);
      const clustersList = results.reduce((acc, r) => acc.concat(r), []);

      setDBClusters(clustersList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDBClusters();

    timer = setInterval(() => getDBClusters(false), RECHECK_INTERVAL);

    return () => clearTimeout(timer);
  }, []);

  return [dbClusters, getDBClusters, loading];
};

const getClusters = async (kubernetes: Kubernetes[], databaseType: Databases): Promise<DBCluster[]> => {
  const dbClusterService = DBClusterServiceFactory.newDBClusterService(databaseType);
  const requests = kubernetes.map(dbClusterService.getDBClusters);
  const results = await processPromiseResults(requests);

  const clustersList: DBCluster[] = results.reduce((acc: DBCluster[], r, index) => {
    if (r.status !== 'fulfilled') {
      return acc;
    }

    const clusters: DBClusterPayload[] = (r as FulfilledPromiseResult).value?.clusters ?? [];

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
