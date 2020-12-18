import React from 'react';
import {KubernetesClusterActions} from '../KubernetesClusterActions/KubernetesClusterActions';

export const clusterActionsRender = ({
  setSelectedCluster,
  setDeleteModalVisible,
  setViewConfigModalVisible,
  getDBClusters,
}: Omit<any, 'dbCluster'>) => (dbCluster) => (
  <KubernetesClusterActions
    dbCluster={dbCluster}
    setSelectedCluster={setSelectedCluster}
    setDeleteModalVisible={setDeleteModalVisible}
    setViewConfigModalVisible={setViewConfigModalVisible}
    getDBClusters={getDBClusters}
  />
);
