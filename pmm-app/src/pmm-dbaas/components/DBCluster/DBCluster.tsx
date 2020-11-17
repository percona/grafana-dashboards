import React, { FC, useCallback, useMemo, useState } from 'react';
import { Button, useStyles } from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table/Table';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { AddClusterButton } from '../AddClusterButton/AddClusterButton';
import { getStyles } from './DBCluster.styles';
import { DBCluster as Cluster, DBClusterProps } from './DBCluster.types';
import { AddDBClusterModal } from './AddDBClusterModal/AddDBClusterModal';
import { EditDBClusterModal } from './EditDBClusterModal/EditDBClusterModal';
import { useDBClusters } from './DBCluster.hooks';
import {
  clusterStatusRender,
  connectionRender,
  databaseTypeRender,
  parametersRender,
  clusterNameRender,
} from './ColumnRenderers/ColumnRenderers';
import { DeleteDBClusterModal } from './DeleteDBClusterModal/DeleteDBClusterModal';
import { isClusterChanging } from './DBCluster.utils';

export const DBCluster: FC<DBClusterProps> = ({ kubernetes }) => {
  const styles = useStyles(getStyles);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<Cluster>();
  const [dbClusters, getDBClusters, loading] = useDBClusters(kubernetes);

  const columns = useMemo(
    () => [
      {
        Header: Messages.dbcluster.table.nameColumn,
        accessor: clusterNameRender,
      },
      {
        Header: Messages.dbcluster.table.databaseTypeColumn,
        accessor: databaseTypeRender,
      },
      {
        Header: Messages.dbcluster.table.connectionColumn,
        accessor: connectionRender,
      },
      {
        Header: Messages.dbcluster.table.clusterParametersColumn,
        accessor: parametersRender,
      },
      {
        Header: Messages.dbcluster.table.clusterStatusColumn,
        accessor: clusterStatusRender,
      },
      {
        Header: Messages.dbcluster.table.actionsColumn,
        accessor: (element) => (
          <div className={styles.actionsColumn}>
            <Button
              size="md"
              onClick={() => {
                setSelectedCluster(element);
                setDeleteModalVisible(true);
              }}
              icon="trash-alt"
              variant="destructive"
              data-qa="open-delete-modal-button"
              disabled={isClusterChanging(element)}
            >
              {Messages.dbcluster.table.actions.deleteCluster}
            </Button>
            <Button
              size="md"
              onClick={() => {
                setSelectedCluster(element);
                setEditModalVisible(true);
              }}
              icon="edit"
              variant="primary"
              data-qa="open-edit-modal-button"
              disabled={isClusterChanging(element)}
              className={styles.actionButton}
            >
              {Messages.dbcluster.table.actions.editCluster}
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const kubernetesOptions = kubernetes.map(({ kubernetesClusterName }) => ({
    value: kubernetesClusterName,
    label: kubernetesClusterName,
  }));
  const AddNewClusterButton = useCallback(
    () => (
      <AddClusterButton
        label={Messages.dbcluster.addAction}
        action={() => setAddModalVisible(!addModalVisible)}
        data-qa="dbcluster-add-cluster-button"
      />
    ),
    [addModalVisible],
  );

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.actionPanel}>
        <AddNewClusterButton />
      </div>
      <AddDBClusterModal
        kubernetesOptions={kubernetesOptions}
        isVisible={addModalVisible}
        setVisible={setAddModalVisible}
        onDBClusterAdded={getDBClusters}
      />
      <DeleteDBClusterModal
        isVisible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onClusterDeleted={getDBClusters}
        selectedCluster={selectedCluster}
      />
      <EditDBClusterModal
        isVisible={editModalVisible}
        setVisible={setEditModalVisible}
        onDBClusterChanged={getDBClusters}
        selectedCluster={selectedCluster}
      />
      <Table columns={columns} data={dbClusters} loading={loading} noData={<AddNewClusterButton />} />
    </div>
  );
};
