import React, { FC, useCallback } from 'react';
import { Field } from 'react-final-form';
import { TextInputField, validators } from '@percona/platform-core';
import { Databases } from 'shared/core';
import { SelectFieldAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { XtraDBClusterBasicOptionsProps } from './XtraDBClusterBasicOptions.types';
import { DATABASE_OPTIONS } from '../../XtraDB.constants';
import { AddXtraDBFields } from '../AddXtraDBModal.types';
import { XtraDBTopology } from '../XtraDBAdvancedOptions/XtraDBAdvancedOptions.types';

export const XtraDBClusterBasicOptions: FC<XtraDBClusterBasicOptionsProps> = ({
  kubernetesOptions,
  form,
}) => {
  const { required } = validators;
  const { change } = form;
  const onChangeDatabase = useCallback((databaseType) => {
    if (databaseType.value !== Databases.mysql) {
      change(AddXtraDBFields.topology, XtraDBTopology.cluster);
    }

    change(AddXtraDBFields.databaseType, databaseType);
  }, []);

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
        onChange={onChangeDatabase}
      />
    </>
  );
};
