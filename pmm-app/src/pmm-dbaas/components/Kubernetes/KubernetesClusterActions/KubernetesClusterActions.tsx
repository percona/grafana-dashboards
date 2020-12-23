import React, { FC, useCallback } from 'react';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { MultipleActions } from 'pmm-dbaas/components/MultipleActions/MultipleActions';
import { DBClusterActionsProps } from './KubernetesClusterActions.types';
import { styles } from './KubernetesClusterActions.styles';
import { Kubernetes } from '../Kubernetes.types';

export const KubernetesClusterActions: FC<DBClusterActionsProps> = ({
  kubernetesCluster,
  setSelectedCluster,
  setDeleteModalVisible,
  setViewConfigModalVisible,
  getDBClusters,
}) => {
  const getActions = useCallback(
    (kubernetesCluster: Kubernetes) => [
      {
        title: Messages.kubernetes.deleteAction,
        action: () => {
          setSelectedCluster(kubernetesCluster);
          setDeleteModalVisible(true);
        },
      },
      {
        title: Messages.kubernetes.showConfiguration,
        action: () => {
          setSelectedCluster(kubernetesCluster);
          setViewConfigModalVisible(true);
        },
      },
    ],
    [setSelectedCluster, setDeleteModalVisible, getDBClusters],
  );

  return (
    <div className={styles.actionsColumn}>
      <MultipleActions actions={getActions(kubernetesCluster)} dataQa="dbcluster-actions" />
    </div>
  );
};
