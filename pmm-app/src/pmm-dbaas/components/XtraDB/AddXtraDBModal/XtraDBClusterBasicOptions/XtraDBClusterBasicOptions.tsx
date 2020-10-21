import React, { FC } from 'react';
import { Field } from 'react-final-form';
import { TextInputField, validators } from '@percona/platform-core';
import { SelectFieldAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { XtraDBClusterBasicOptionsProps } from './XtraDBClusterBasicOptions.types';
import { DATABASE_OPTIONS } from '../../XtraDB.constants';
import { AddXtraDBFields } from '../AddXtraDBModal.types';

export const XtraDBClusterBasicOptions: FC<XtraDBClusterBasicOptionsProps> = ({
  kubernetesOptions,
}) => {
  const { required } = validators;

  return (
    <>
      <TextInputField
        name={AddXtraDBFields.name}
        label={Messages.xtradb.addModal.fields.clusterName}
        validators={[required]}
      />
      <Field
        dataQa="xtradb-kubernetes-cluster-field"
        name={AddXtraDBFields.kubernetesCluster}
        label={Messages.xtradb.addModal.fields.kubernetesCluster}
        options={kubernetesOptions}
        component={SelectFieldAdapter}
        validate={required}
      />
      <Field
        dataQa="xtradb-database-type-field"
        name={AddXtraDBFields.databaseType}
        label={Messages.xtradb.addModal.fields.databaseType}
        options={DATABASE_OPTIONS}
        component={SelectFieldAdapter}
        validate={required}
      />
    </>
  );
};
