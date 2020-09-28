import React, { FC, useState } from 'react';
import { useStyles } from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table/Table';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { AddClusterButton } from '../AddClusterButton/AddClusterButton';
import { getStyles } from './XtraDB.styles';
import { XtraDBProps } from './XtraDB.types';
import { AddXtraDBModal } from './AddXtraDBModal/AddXtraDBModal';

export const XtraDB: FC<XtraDBProps> = ({ kubernetes }) => {
  const styles = useStyles(getStyles);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const columns = [
    {
      Header: Messages.xtradb.table.nameColumn,
      accessor: 'name',
    }
  ];
  const kubernetesOptions = kubernetes.map(({ kubernetesClusterName }) => ({
    value: kubernetesClusterName,
    label: kubernetesClusterName,
  }));

  const AddNewClusterButton = () => (
    <AddClusterButton
      label={Messages.xtradb.addAction}
      action={() => setAddModalVisible(!addModalVisible)}
      data-qa="xtradb-add-cluster-button"
    />
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
      />
      <Table
        columns={columns}
        data={[]}
        loading={false}
        noData={<AddNewClusterButton />}
      />
    </div>
  );
};
