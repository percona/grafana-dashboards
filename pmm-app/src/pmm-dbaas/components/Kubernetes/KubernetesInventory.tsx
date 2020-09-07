import React, { FC, useState } from 'react';
import {
  Button, HorizontalGroup, Modal, useStyles
} from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table/Table';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { getStyles } from './Kubernetes.styles';
import { useKubernetes } from './Kubernetes.hooks';
import { Kubernetes } from './Kubernetes.types';

export const KubernetesInventory: FC = () => {
  const styles = useStyles(getStyles);
  const [kubernetesToDelete, setKubernetesToDelete] = useState<Kubernetes>({ kubernetesClusterName: '' });
  const [kubernetes, deleteKubernetes, loading] = useKubernetes();
  const [modalVisible, setModalVisible] = useState(false);
  const columns = [
    {
      Header: Messages.kubernetes.table.nameColumn,
      accessor: 'kubernetesClusterName',
    },
    {
      Header: Messages.kubernetes.table.actionsColumn,
      accessor: (element) => (
        <div className={styles.actionsColumn}>
          <Button
            size="md"
            onClick={() => {
              setKubernetesToDelete(element);
              setModalVisible(!modalVisible);
            }}
            icon="trash-alt"
            variant="destructive"
            data-qa="open-delete-modal-button"
          >
            {Messages.kubernetes.deleteAction}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className={styles.tableWrapper}>
      <Modal
        title={Messages.kubernetes.deleteModal.title}
        isOpen={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <h4 className={styles.deleteModalContent}>
          {Messages.kubernetes.deleteModal.confirmMessage}
        </h4>
        <HorizontalGroup justify="space-between" spacing="md">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setModalVisible(false)}
            data-qa="cancel-delete-kubernetes-button"
          >
            {Messages.kubernetes.deleteModal.cancel}
          </Button>
          <Button
            variant="destructive"
            size="md"
            onClick={() => {
              deleteKubernetes(kubernetesToDelete);
              setModalVisible(false);
            }}
            data-qa="delete-kubernetes-button"
          >
            {Messages.kubernetes.deleteModal.confirm}
          </Button>
        </HorizontalGroup>
      </Modal>
      <Table
        columns={columns}
        data={kubernetes}
        loading={loading}
      />
    </div>
  );
};
