import React, { FC, useCallback } from 'react';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { MultipleActions } from 'pmm-dbaas/components/MultipleActions/MultipleActions';
import { DBCluster } from '../DBCluster.types';
// import { isClusterChanging } from '../DBCluster.utils';
import { DBClusterServiceFactory } from '../DBClusterService.factory';
import { DBClusterActionsProps } from './KubernetesClusterActions.types';
import { styles } from './KubernetesClusterActions.styles';

export const KubernetesClusterActions: FC<DBClusterActionsProps> = ({
  dbCluster,
  setSelectedCluster,
  setDeleteModalVisible,
  setViewConfigModalVisible,
  getDBClusters,
}) => {
  const getActions = useCallback(
    (dbCluster: DBCluster) => [
      {
        title: Messages.kubernetes.deleteAction,
        action: () => {
          setSelectedCluster(dbCluster);
          setDeleteModalVisible(true);
        },
      },
      {
        title: 'Show configuration',
        action: () => {
          setSelectedCluster(dbCluster);
          setViewConfigModalVisible(true);
        },
      },
    ],
    [setSelectedCluster, setDeleteModalVisible, getDBClusters],
  );

  return (
    <div className={styles.actionsColumn}>
      <MultipleActions
        actions={getActions(dbCluster)}
        // disabled={isClusterChanging(dbCluster)}
        dataQa="dbcluster-actions"
      />
    </div>
  );
};
