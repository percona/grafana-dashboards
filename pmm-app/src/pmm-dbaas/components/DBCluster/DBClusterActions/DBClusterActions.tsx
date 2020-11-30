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
      {
        title:
          dbCluster.status === DBClusterStatus.ready
            ? Messages.dbcluster.table.actions.suspend
            : Messages.dbcluster.table.actions.resume,
        disabled:
          dbCluster.status !== DBClusterStatus.ready && dbCluster.status !== DBClusterStatus.suspended,
        action: async () => {
          try {
            const dbClusterService = DBClusterServiceFactory.newDBClusterService(dbCluster.databaseType);

            if (dbCluster.status === DBClusterStatus.ready) {
              await dbClusterService.suspend(dbCluster);
            } else {
              await dbClusterService.resume(dbCluster);
            }

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
      <MultipleActions
        actions={getActions(dbCluster)}
        disabled={isClusterChanging(dbCluster)}
        dataQa="dbcluster-actions"
      />
    </div>
  );
};
