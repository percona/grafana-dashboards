import React, { FC, useCallback, useState } from 'react';
import { Field } from 'react-final-form';
import { TextInputField, validators } from '@percona/platform-core';
import { DATABASE_LABELS, Databases } from 'shared/core';
import { SelectFieldAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DBClusterBasicOptionsProps } from './DBClusterBasicOptions.types';
import { DATABASE_OPTIONS } from '../../DBCluster.constants';
import { AddDBClusterFields } from '../AddDBClusterModal.types';
import { DBClusterTopology } from '../DBClusterAdvancedOptions/DBClusterAdvancedOptions.types';
import { OptionContent } from '../../OptionContent/OptionContent';
import { kubernetesClusterName } from './DBClusterBasicOptions.utils';

export const DBClusterBasicOptions: FC<DBClusterBasicOptionsProps> = ({ kubernetes, form }) => {
  const DATABASE_TYPES = [Databases.mongodb, Databases.mysql];
  const { required } = validators;
  const { change } = form;
  const onChangeDatabase = useCallback((databaseType) => {
    if (databaseType.value !== Databases.mysql) {
      change(AddDBClusterFields.topology, DBClusterTopology.cluster);
    }

    change(AddDBClusterFields.databaseType, databaseType);
  }, []);

  const kubernetesOptions = kubernetes.map(({ kubernetesClusterName }) => {
    const installedOperators = {
      mysql: true,
      mongodb: false,
    };

    const availableTypes = DATABASE_TYPES.filter((databaseType) => installedOperators[databaseType]);
    const disabledTypes = DATABASE_TYPES.filter((databaseType) => !installedOperators[databaseType]);

    const getOptionContent = (listOfOperators, kubernetesClusterName) => {
      return (
        <OptionContent
          title={kubernetesClusterName}
          description={disabledTypes.length ? 'Operators must be installed to use database type' : ''}
          tags={availableTypes.map((databaseType) => DATABASE_LABELS[databaseType])}
          disabledTags={disabledTypes.map((databaseType) => DATABASE_LABELS[databaseType])}
        />
      );
    };

    return {
      value: kubernetesClusterName,
      label: getOptionContent(installedOperators, kubernetesClusterName),
      installedOperators,
    };
  });

  const [databaseOptions, setDatabaseOptions] = useState(DATABASE_OPTIONS);
  const onChangeCluster = useCallback((selectedKubernetes) => {
    const selectedDatabase = form.getState().values[AddDBClusterFields.databaseType]?.value
    const availableDatabaseOptions = [];

    DATABASE_TYPES.forEach((databaseType) => {
      if (!selectedKubernetes.installedOperators[databaseType]) {
        availableDatabaseOptions.push({
          value: Databases[databaseType],
          label: DATABASE_LABELS[databaseType],
        });

        if (selectedDatabase === Databases[databaseType])
          change(AddDBClusterFields.databaseType, {
            value: undefined,
            label: undefined,
          });
      }
    });

    setDatabaseOptions(availableDatabaseOptions);
    change(AddDBClusterFields.kubernetesCluster, selectedKubernetes);
  }, []);

  return (
    <>
      <TextInputField
        name={AddDBClusterFields.name}
        label={Messages.dbcluster.addModal.fields.clusterName}
        validators={[required, kubernetesClusterName]}
      />
      <Field
        dataQa="dbcluster-kubernetes-cluster-field"
        name={AddDBClusterFields.kubernetesCluster}
        label={Messages.dbcluster.addModal.fields.kubernetesCluster}
        options={kubernetesOptions}
        component={SelectFieldAdapter}
        validate={required}
        onChange={onChangeCluster}
      />
      <Field
        // disabled={!form.getState().values[AddDBClusterFields.kubernetesCluster]}
        disabled={!databaseOptions.length}
        dataQa="dbcluster-database-type-field"
        name={AddDBClusterFields.databaseType}
        label={Messages.dbcluster.addModal.fields.databaseType}
        options={databaseOptions}
        component={SelectFieldAdapter}
        validate={required}
        onChange={onChangeDatabase}
      />
    </>
  );
};
