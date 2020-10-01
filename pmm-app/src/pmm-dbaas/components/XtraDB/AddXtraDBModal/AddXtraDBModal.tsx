import React, { FC, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { HorizontalGroup } from '@grafana/ui';
import { LoaderButton, TextInputField, validators } from '@percona/platform-core';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import { SelectFieldAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DATABASE_OPTIONS } from '../XtraDB.constants';
import { AddXtraDBModalProps } from './AddXtraDBModal.types';
import { XtraDBService } from '../XtraDB.service';
import { XtraDBCluster } from '../XtraDB.types';

export const AddXtraDBModal: FC<AddXtraDBModalProps> = ({
  kubernetesOptions,
  isVisible,
  setVisible,
  onXtraDBAdded
}) => {
  const [loading, setLoading] = useState(false);
  const addXtraDBCluster = async (xtraDBCluster: XtraDBCluster) => {
    try {
      setLoading(true);

      await XtraDBService.addXtraDBCluster(xtraDBCluster);
      setVisible(false);
      onXtraDBAdded();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={Messages.xtradb.addModal.title}
      isVisible={isVisible}
      onClose={() => setVisible(false)}
    >
      <Form
        onSubmit={({
          name,
          kubernetesCluster,
          databaseType
        }) => {
          addXtraDBCluster({
            kubernetesClusterName: kubernetesCluster.value,
            clusterName: name,
            databaseType: databaseType.value
          });
        }}
        render={({
          handleSubmit, valid, pristine
        }) => (
          <form data-qa="xtradb-add-form" onSubmit={handleSubmit}>
            <TextInputField
              name="name"
              label={Messages.xtradb.addModal.fields.clusterName}
              validators={[validators.required]}
            />
            <Field
              dataQa="xtradb-kubernetes-cluster-field"
              name="kubernetesCluster"
              label={Messages.xtradb.addModal.fields.kubernetesCluster}
              options={kubernetesOptions}
              component={SelectFieldAdapter}
              validate={validators.compose(validators.required)}
            />
            <Field
              dataQa="xtradb-database-type-field"
              name="databaseType"
              label={Messages.xtradb.addModal.fields.databaseType}
              options={DATABASE_OPTIONS}
              component={SelectFieldAdapter}
              validate={validators.compose(validators.required)}
            />
            <HorizontalGroup justify="center" spacing="md">
              <LoaderButton
                data-qa="xtradb-create-cluster-button"
                size="md"
                variant="primary"
                disabled={!valid || pristine}
                loading={loading}
              >
                {Messages.xtradb.addModal.confirm}
              </LoaderButton>
            </HorizontalGroup>
          </form>
        )}
      />
    </Modal>
  );
};
