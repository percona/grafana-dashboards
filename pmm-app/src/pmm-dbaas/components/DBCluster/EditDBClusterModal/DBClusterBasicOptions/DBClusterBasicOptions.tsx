import React, { FC, useCallback } from 'react';
import { Field } from 'react-final-form';
import { TextInputField, validators } from '@percona/platform-core';
import { Databases } from 'shared/core';
import { SelectFieldAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DBClusterBasicOptionsProps } from './DBClusterBasicOptions.types';
import { DATABASE_OPTIONS } from '../../DBCluster.constants';
import { EditDBClusterFields } from '../EditDBClusterModal.types';
import { DBClusterTopology } from '../DBClusterAdvancedOptions/DBClusterAdvancedOptions.types';

export const DBClusterBasicOptions: FC<DBClusterBasicOptionsProps> = ({
  kubernetesOptions,
  form,
}) => {
  const { required } = validators;
  const { change } = form;
  const onChangeDatabase = useCallback((databaseType) => {
    if (databaseType.value !== Databases.mysql) {
      change(EditDBClusterFields.topology, DBClusterTopology.cluster);
    }

    change(EditDBClusterFields.databaseType, databaseType);
  }, []);

  return (
    <>
      <TextInputField
        name={EditDBClusterFields.name}
        label={Messages.dbcluster.addModal.fields.clusterName}
        validators={[required]}
      />
      <Field
        dataQa="dbcluster-kubernetes-cluster-field"
        name={EditDBClusterFields.kubernetesCluster}
        label={Messages.dbcluster.addModal.fields.kubernetesCluster}
        options={kubernetesOptions}
        component={SelectFieldAdapter}
        validate={required}
      />
      <Field
        dataQa="dbcluster-database-type-field"
        name={EditDBClusterFields.databaseType}
        label={Messages.dbcluster.addModal.fields.databaseType}
        options={DATABASE_OPTIONS}
        component={SelectFieldAdapter}
        validate={required}
        onChange={onChangeDatabase}
      />
    </>
  );
};
