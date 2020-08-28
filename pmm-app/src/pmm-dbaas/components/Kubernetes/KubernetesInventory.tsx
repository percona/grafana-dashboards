import React, { FC, useEffect, useState } from 'react';
import {
  Button, HorizontalGroup, useTheme
} from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table/Table';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { SelectedTableRows } from 'shared/components/Elements/Table';
import { Field, Form } from 'react-final-form';
import { InputFieldAdapter, TextAreaAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import validators from 'shared/components/helpers/validators';
import { KUBERNETES_COLUMNS } from './Kubernetes.constants';
import { getStyles } from './Kubernetes.styles';
import { useKubernetes } from './Kubernetes.hooks';
import { Kubernetes, NewKubernetesCluster } from './Kubernetes.types';

export const KubernetesInventory: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [selected, setSelectedRows] = useState<Array<SelectedTableRows<Kubernetes>>>([]);
  const [kubernetes, deleteKubernetes, addKubernetes, loading] = useKubernetes();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => setSelectedRows([]), [kubernetes]);

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
        <Button
          size="md"
          disabled={selected.length === 0}
          onClick={() => {
            setDeleteModalVisible(true);
          }}
          icon="trash-alt"
          variant="destructive"
        >
          {Messages.kubernetes.deleteAction}
        </Button>
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
          {Messages.kubernetes.deleteModal.getConfirmMessage(selected.length)}
        </h4>
        <HorizontalGroup justify="space-between" spacing="md">
          <Button variant="secondary" size="md" onClick={() => setDeleteModalVisible(false)}>
            {Messages.kubernetes.deleteModal.cancel}
          </Button>
          <Button
            variant="destructive"
            size="md"
            onClick={() => {
              deleteKubernetes(selected.map((row) => row.original));
              setDeleteModalVisible(false);
            }}
          >
            {Messages.kubernetes.deleteModal.confirm}
          </Button>
        </HorizontalGroup>
      </Modal>
      <Table
        columns={KUBERNETES_COLUMNS}
        data={kubernetes}
        rowSelection
        onRowSelection={(selected) => setSelectedRows(selected)}
        loading={loading}
        noData={<AddNewClusterButton />}
      />
    </div>
  );
};
