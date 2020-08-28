import React, { FC, useState } from 'react';
import {
  Button, HorizontalGroup, useStyles
} from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table/Table';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { Field, Form } from 'react-final-form';
import { InputFieldAdapter, TextAreaAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import validators from 'shared/components/helpers/validators';
import { getStyles } from './Kubernetes.styles';
import { useKubernetes } from './Kubernetes.hooks';
import { Kubernetes, NewKubernetesCluster } from './Kubernetes.types';

export const KubernetesInventory: FC = () => {
  const styles = useStyles(getStyles);
  const [kubernetesToDelete, setKubernetesToDelete] = useState<Kubernetes>({ kubernetesClusterName: '' });
  const [kubernetes, deleteKubernetes, addKubernetes, loading] = useKubernetes();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
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
              setDeleteModalVisible(true);
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

  const AddNewClusterButton = () => (
    <Button
      size="md"
      onClick={() => setAddModalVisible(!addModalVisible)}
      icon="plus-square"
      variant="link"
    >
      {Messages.kubernetes.addAction}
    </Button>
  );

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.actionPanel}>
        <AddNewClusterButton />
      </div>
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
          render={({ form, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <>
                <Field
                  data-qa="kubernetes-cluster-name-field"
                  name="name"
                  label={Messages.kubernetes.addModal.fields.clusterName}
                  component={InputFieldAdapter}
                  validate={validators.compose(validators.required)}
                />
                <Field
                  data-qa="kubernetes-kubeconfig-field"
                  name="kubeConfig"
                  label={Messages.kubernetes.addModal.fields.kubeConfig}
                  component={TextAreaAdapter}
                  validate={validators.compose(validators.required)}
                />

                <HorizontalGroup justify="center" spacing="md">
                  <Button
                    data-qa="kubernetes-add-cluster-button"
                    size="md"
                    variant="primary"
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
        <h4 className={styles.deleteModalContent}>
          {Messages.kubernetes.deleteModal.confirmMessage}
        </h4>
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
              deleteKubernetes(kubernetesToDelete);
              setDeleteModalVisible(false);
            }}
            data-qa="delete-kubernetes-button"
          >
            {Messages.kubernetes.deleteModal.confirm}
          </Button>
        </HorizontalGroup>
      </Modal>
      <Modal
        title={Messages.kubernetes.deleteModal.title}
        isVisible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
      >
        <h4 className={styles.deleteModalContent}>
          {Messages.kubernetes.deleteModal.getConfirmMessage(selected.length)}
        </h4>
        <HorizontalGroup justify="space-between" spacing="md">
          <Button variant="secondary" size="md" onClick={() => setDeleteModalVisible(false)} data-qa="cancel-delete-kubernetes-button">
            {Messages.kubernetes.deleteModal.cancel}
          </Button>
          <Button
            variant="destructive"
            size="md"
            onClick={() => {
              deleteKubernetes(selected.map((row) => row.original));
              setDeleteModalVisible(false);
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
        noData={<AddNewClusterButton />}
      />
    </div>
  );
};
