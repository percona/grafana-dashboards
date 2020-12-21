import React, { FC, useCallback, useState } from 'react';
import { Button, HorizontalGroup, useStyles } from '@grafana/ui';
import { TextInputField, TextareaInputField, validators } from '@percona/platform-core';
import { Table } from 'shared/components/Elements/Table/Table';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { Form, FormRenderProps } from 'react-final-form';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import { Databases } from 'shared/core';
import { getStyles } from './Kubernetes.styles';
import { NewKubernetesCluster, KubernetesProps } from './Kubernetes.types';
import { AddClusterButton } from '../AddClusterButton/AddClusterButton';
import { OperatorStatusItem } from './OperatorStatusItem/OperatorStatusItem';
import { KubernetesClusterStatus } from './KubernetesClusterStatus/KubernetesClusterStatus';
import { clusterActionsRender } from './ColumnRenderers/ColumnRenderers';
import { ViewClusterConfigModal } from './ViewClusterConfigModal/ViewClusterConfigModal';

export const KubernetesInventory: FC<KubernetesProps> = ({
  kubernetes,
  deleteKubernetes,
  addKubernetes,
  loading,
}) => {
  const styles = useStyles(getStyles);
  const [selectedCluster, setSelectedCluster] = useState<Kubernetes>({ kubernetesClusterName: '' });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [viewConfigModalVisible, setViewConfigModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const { required } = validators;
  const columns = [
    {
      Header: Messages.kubernetes.table.nameColumn,
      accessor: 'kubernetesClusterName',
    },
    {
      Header: Messages.kubernetes.table.clusterStatusColumn,
      accessor: (element) => <KubernetesClusterStatus status={element.status} />,
    },
    {
      Header: Messages.kubernetes.table.operatorsStatusColumn,
      accessor: (element) => (
        <div>
          <OperatorStatusItem databaseType={Databases.mysql} status={element.operators.xtradb.status} />
          <OperatorStatusItem databaseType={Databases.mongodb} status={element.operators.psmdb.status} />
        </div>
      ),
    },
    {
      Header: Messages.kubernetes.table.actionsColumn,
      accessor: (kubernetesCluster) => clusterActionsRender({
        setSelectedCluster,
        setDeleteModalVisible,
        setViewConfigModalVisible,
      })(kubernetesCluster),
    },
  ];

  const AddNewClusterButton = useCallback(
    () => (
      <AddClusterButton
        label={Messages.kubernetes.addAction}
        action={() => setAddModalVisible(!addModalVisible)}
        data-qa="kubernetes-new-cluster-button"
      />
    ),
    [addModalVisible],
  );

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.actionPanel}>
        <AddNewClusterButton />
      </div>
      <ViewClusterConfigModal
        isVisible={viewConfigModalVisible}
        setVisible={() => setViewConfigModalVisible(false)}
        selectedCluster={selectedCluster}
      />
      <Modal
        title={Messages.kubernetes.addModal.title}
        isVisible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
      >
        <Form
          onSubmit={(values: NewKubernetesCluster) => {
            addKubernetes(values);
            setAddModalVisible(false);
          }}
          render={({ handleSubmit, valid, pristine }: FormRenderProps<NewKubernetesCluster>) => (
            <form onSubmit={handleSubmit}>
              <>
                <TextInputField
                  name="name"
                  label={Messages.kubernetes.addModal.fields.clusterName}
                  validators={[required]}
                />
                <TextareaInputField
                  name="kubeConfig"
                  label={Messages.kubernetes.addModal.fields.kubeConfig}
                  validators={[required]}
                />

                <HorizontalGroup justify="center" spacing="md">
                  <Button
                    data-qa="kubernetes-add-cluster-button"
                    size="md"
                    variant="primary"
                    disabled={!valid || pristine}
                  >
                    {Messages.kubernetes.addModal.confirm}
                  </Button>
                </HorizontalGroup>
              </>
            </form>
          )}
        />
      </Modal>
      <Modal
        title={Messages.kubernetes.deleteModal.title}
        isVisible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
      >
        <h4 className={styles.deleteModalContent}>{Messages.kubernetes.deleteModal.confirmMessage}</h4>
        <HorizontalGroup justify="space-between" spacing="md">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setDeleteModalVisible(false)}
            data-qa="cancel-delete-kubernetes-button"
          >
            {Messages.kubernetes.deleteModal.cancel}
          </Button>
          <Button
            variant="destructive"
            size="md"
            onClick={() => {
              deleteKubernetes(selectedCluster);
              setDeleteModalVisible(false);
            }}
            data-qa="delete-kubernetes-button"
          >
            {Messages.kubernetes.deleteModal.confirm}
          </Button>
        </HorizontalGroup>
      </Modal>
      <Table columns={columns} data={kubernetes} loading={loading} noData={<AddNewClusterButton />} />
    </div>
  );
};
