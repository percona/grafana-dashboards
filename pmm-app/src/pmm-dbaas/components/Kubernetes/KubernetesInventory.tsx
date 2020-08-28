import React, { FC, useState } from 'react';
import {
  Button, HorizontalGroup, TextArea, useStyles
} from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table/Table';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
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
      <div className={styles.actionPanel}>
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
      {/*<Modal*/}
      {/*  title={Messages.kubernetes.deleteModal.title}*/}
      {/*  isOpen={modalVisible}*/}
      {/*  onDismiss={() => setModalVisible(false)}*/}
      {/*>*/}
      {/*  <h4 className={styles.deleteModalContent}>*/}
      {/*    {Messages.kubernetes.deleteModal.getConfirmMessage(selected.length)}*/}
      {/*  </h4>*/}
      {/*  <HorizontalGroup justify="space-between" spacing="md">*/}
      {/*    <Button variant="secondary" size="md" onClick={() => setModalVisible(false)} data-qa="cancel-delete-kubernetes-button">*/}
      {/*      {Messages.kubernetes.deleteModal.cancel}*/}
      {/*    </Button>*/}
      {/*    <Button*/}
      {/*      variant="destructive"*/}
      {/*      size="md"*/}
      {/*      onClick={() => {*/}
      {/*        deleteKubernetes(selected.map((row) => row.original));*/}
      {/*        setModalVisible(false);*/}
      {/*      }}*/}
      {/*       data-qa="delete-kubernetes-button" */}
      {/*    >*/}
      {/*      {Messages.kubernetes.deleteModal.confirm}*/}
      {/*    </Button>*/}
      {/*  </HorizontalGroup>*/}
      {/*</Modal>*/}
      <Table
        columns={columns}
        data={kubernetes}
        loading={loading}
      />
    </div>
  );
};
