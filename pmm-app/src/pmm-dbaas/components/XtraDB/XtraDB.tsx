import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import { Button, useStyles } from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table/Table';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { AddClusterButton } from '../AddClusterButton/AddClusterButton';
import { getStyles } from './XtraDB.styles';
import { XtraDBCluster, XtraDBProps } from './XtraDB.types';
import { AddXtraDBModal } from './AddXtraDBModal/AddXtraDBModal';
import { useXtraDBClusters } from './XtraDB.hooks';
import { clusterStatusRender } from './ColumnRenderers/ColumnRenderers';
import { DeleteXtraDBModal } from './DeleteXtraDBModal/DeleteXtraDBModal';

export const XtraDB: FC<XtraDBProps> = ({ kubernetes }) => {
  const styles = useStyles(getStyles);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<XtraDBCluster>();
  const [xtraDBClusters, getXtraDBClusters, loading] = useXtraDBClusters(kubernetes);

  const columns = useMemo(
    () => [
      {
        Header: Messages.xtradb.table.nameColumn,
        accessor: 'clusterName',
      },
      {
        Header: Messages.xtradb.table.databaseTypeColumn,
        accessor: 'databaseType',
      },
      {
        Header: Messages.xtradb.table.clusterStatusColumn,
        accessor: clusterStatusRender,
      },
      {
        Header: Messages.xtradb.table.actionsColumn,
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
            >
              {Messages.xtradb.table.actions.deleteCluster}
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
        label={Messages.xtradb.addAction}
        action={() => setAddModalVisible(!addModalVisible)}
        data-qa="xtradb-add-cluster-button"
      />
    ),
    [addModalVisible],
  );

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.actionPanel}>
        <AddNewClusterButton />
      </div>
      <AddXtraDBModal
        kubernetesOptions={kubernetesOptions}
        isVisible={addModalVisible}
        setVisible={setAddModalVisible}
        onXtraDBAdded={getXtraDBClusters}
      />
      <DeleteXtraDBModal
        isVisible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onClusterDeleted={getXtraDBClusters}
        selectedCluster={selectedCluster}
      />
      <Table columns={columns} data={xtraDBClusters} loading={loading} noData={<AddNewClusterButton />} />
    </div>
  );
};
