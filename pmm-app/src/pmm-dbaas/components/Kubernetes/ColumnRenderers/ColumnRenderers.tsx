import React from 'react';
import { DATABASE_LABELS } from 'shared/core';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DBClusterConnection } from '../DBClusterConnection/DBClusterConnection';
import { DBClusterStatus } from '../DBClusterStatus/DBClusterStatus';
import { DBClusterStatus as Status } from '../DBCluster.types';
import { DBClusterParameters } from '../DBClusterParameters/DBClusterParameters';
import { DBClusterName } from '../DBClusterName/DBClusterName';
import { DBClusterActions } from '../DBClusterActions/DBClusterActions';
import { DBClusterActionsProps } from '../DBClusterActions/DBClusterActions.types';
import { KubernetesClusterActions } from '../KubernetesClusterActions/DBClusterActions';

// export const clusterNameRender = (dbCluster) => (
//   <DBClusterName dbCluster={dbCluster} />
// );
//
// export const databaseTypeRender = (dbCluster) => DATABASE_LABELS[dbCluster.databaseType];
//
// export const clusterStatusRender = (dbCluster) => {
//   const { status, errorMessage } = dbCluster;
//
//   return (
//     <DBClusterStatus
//       status={status || Status.failed}
//       errorMessage={errorMessage || Messages.dbcluster.table.status.errorMessage}
//     />
//   );
// };
//
// export const connectionRender = (dbCluster) => <DBClusterConnection dbCluster={dbCluster} />;
// export const parametersRender = (dbCluster) => <DBClusterParameters dbCluster={dbCluster} />;

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
