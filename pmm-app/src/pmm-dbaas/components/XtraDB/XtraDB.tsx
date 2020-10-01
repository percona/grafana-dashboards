import React, { FC, useState, useCallback } from 'react';
import { useStyles } from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table/Table';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { AddClusterButton } from '../AddClusterButton/AddClusterButton';
import { getStyles } from './XtraDB.styles';
import { XtraDBProps } from './XtraDB.types';
import { AddXtraDBModal } from './AddXtraDBModal/AddXtraDBModal';
import { useXtraDBClusters } from './XtraDB.hooks';
import { clusterStatusRender, actionsRender } from './ColumnRenderers/ColumnRenderers';

export const XtraDB: FC<XtraDBProps> = ({ kubernetes }) => {
  const styles = useStyles(getStyles);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [xtraDBClusters, getXtraDBClusters, loading] = useXtraDBClusters(kubernetes);
  const columns = [
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
      accessor: actionsRender,
    }
  ];
  const kubernetesOptions = kubernetes.map(({ kubernetesClusterName }) => ({
    value: kubernetesClusterName,
    label: kubernetesClusterName,
  }));
  const AddNewClusterButton = useCallback(() => (
    <AddClusterButton
      label={Messages.xtradb.addAction}
      action={() => setAddModalVisible(!addModalVisible)}
      data-qa="xtradb-add-cluster-button"
    />
  ), [addModalVisible]);

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
      <Table
        columns={columns}
        data={xtraDBClusters}
        loading={loading}
        noData={<AddNewClusterButton />}
      />
    </div>
  );
};
