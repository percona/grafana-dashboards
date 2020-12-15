import React, { FC, useCallback } from 'react';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { MultipleActions } from 'pmm-dbaas/components/MultipleActions/MultipleActions';
import { DBCluster, DBClusterStatus } from '../DBCluster.types';
import { isClusterChanging } from '../DBCluster.utils';
import { DBClusterServiceFactory } from '../DBClusterService.factory';
import { DBClusterActionsProps } from './DBClusterActions.types';
import { styles } from './DBClusterActions.styles';

export const DBClusterActions: FC<DBClusterActionsProps> = ({
  dbCluster,
  setSelectedCluster,
  setDeleteModalVisible,
  setEditModalVisible,
  getDBClusters,
}) => {
  const getActions = useCallback(
    (dbCluster: DBCluster) => [
      {
        title: Messages.dbcluster.table.actions.deleteCluster,
        disabled: dbCluster.status === DBClusterStatus.deleting,
        action: () => {
          setSelectedCluster(dbCluster);
          setDeleteModalVisible(true);
        },
      },
      {
        title: Messages.dbcluster.table.actions.editCluster,
        disabled: dbCluster.status !== DBClusterStatus.ready,
        action: () => {
          setSelectedCluster(dbCluster);
          setEditModalVisible(true);
        },
      },
      {
        title: Messages.dbcluster.table.actions.restartCluster,
        disabled: isClusterChanging(dbCluster),
        action: async () => {
          try {
            const dbClusterService = DBClusterServiceFactory.newDBClusterService(dbCluster.databaseType);

            await dbClusterService.restartDBCluster(dbCluster);
            getDBClusters();
          } catch (e) {
            console.error(e);
          }
        },
      },
    ],
    [setSelectedCluster, setDeleteModalVisible, getDBClusters],
  );

  return (
    <div className={styles.actionsColumn}>
      <MultipleActions actions={getActions(dbCluster)} dataQa="dbcluster-actions" />
    </div>
  );
};
