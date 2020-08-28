import React, { FC, useEffect, useState } from 'react';
import {
  Button, HorizontalGroup, TextArea, useTheme
} from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table/Table';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { SelectedTableRows } from 'shared/components/Elements/Table';
import { KUBERNETES_COLUMNS } from './Kubernetes.constants';
import { getStyles } from './Kubernetes.styles';
import { useKubernetes } from './Kubernetes.hooks';
import { Kubernetes } from './Kubernetes.types';
import {Modal} from "../../../shared/components/Elements/Modal/Modal";
import {styles} from "../../../pmm-inventory/Tabs/Tabs.styles";
import {CheckboxField, FormElement} from "../../../shared/components/Form";
import {Field, Form} from "react-final-form";
import {InputFieldAdapter} from "../../../pmm-settings/components/PlatformLogin/FieldAdapters/FieldAdapters";
import validators from "../../../shared/components/helpers/validators";

export const KubernetesInventory: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [selected, setSelectedRows] = useState<Array<SelectedTableRows<Kubernetes>>>([]);
  const [kubernetes, deleteKubernetes, loading] = useKubernetes();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => setSelectedRows([]), [kubernetes]);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.actionPanel}>
        <Button
          size="md"
          disabled={selected.length === 0}
          onClick={() => setModalVisible(!modalVisible)}
          icon="trash-alt"
          variant="destructive"
        >
          {Messages.kubernetes.deleteAction}
        </Button>
        <Button
          size="md"
          onClick={() => setModalVisible(!modalVisible)}
          icon="trash-alt"
          variant="destructive"
        >
          {'add cluster'}
        </Button>
      </div>
      <Modal
        title={Messages.kubernetes.deleteModal.title}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <Form
          onSubmit={() => {}}
          render={({ form, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <>
                <Field
                  data-qa="sign-up-email-input"
                  name="email"
                  label={'Kubernetes Cluster Name'}
                  component={InputFieldAdapter}
                  validate={validators.compose(validators.required)}
                />
                <Field
                  data-qa="sign-up-email-input"
                  name="email"
                  label={'Kubeconfig file'}
                  component={InputFieldAdapter}
                  validate={validators.compose(validators.required)}
                />
              </>
            </form>
          )}
        />
      </Modal>
      {/*<Modal*/}
      {/*  title={Messages.kubernetes.deleteModal.title}*/}
      {/*  isOpen={modalVisible}*/}
      {/*  onDismiss={() => setModalVisible(false)}*/}
      {/*>*/}
      {/*  <h4 className={styles.deleteModalContent}>*/}
      {/*    {Messages.kubernetes.deleteModal.getConfirmMessage(selected.length)}*/}
      {/*  </h4>*/}
      {/*  <HorizontalGroup justify="space-between" spacing="md">*/}
      {/*    <Button variant="secondary" size="md" onClick={() => setModalVisible(false)}>*/}
      {/*      {Messages.kubernetes.deleteModal.cancel}*/}
      {/*    </Button>*/}
      {/*    <Button*/}
      {/*      variant="destructive"*/}
      {/*      size="md"*/}
      {/*      onClick={() => {*/}
      {/*        deleteKubernetes(selected.map((row) => row.original));*/}
      {/*        setModalVisible(false);*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {Messages.kubernetes.deleteModal.confirm}*/}
      {/*    </Button>*/}
      {/*  </HorizontalGroup>*/}
      {/*</Modal>*/}
      <Table
        columns={KUBERNETES_COLUMNS}
        data={kubernetes}
        rowSelection
        onRowSelection={(selected) => setSelectedRows(selected)}
        loading={loading}
      />
    </div>
  );
};
