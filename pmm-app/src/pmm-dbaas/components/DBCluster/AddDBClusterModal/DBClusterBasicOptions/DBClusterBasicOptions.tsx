import React, { FC, useCallback, useState } from 'react';
import { Field } from 'react-final-form';
import { TextInputField, validators } from '@percona/platform-core';
import { DATABASE_LABELS, Databases } from 'shared/core';
import { SelectFieldAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DatabaseOption, DBClusterBasicOptionsProps } from './DBClusterBasicOptions.types';
import { DATABASE_OPTIONS } from '../../DBCluster.constants';
import { AddDBClusterFields } from '../AddDBClusterModal.types';
import { DBClusterTopology } from '../DBClusterAdvancedOptions/DBClusterAdvancedOptions.types';
import { OptionContent } from '../../OptionContent/OptionContent';
import { kubernetesClusterName } from './DBClusterBasicOptions.utils';
import { KubernetesOperatorStatus } from '../../../Kubernetes/OperatorStatusItem/KubernetesOperatorStatus/KubernetesOperatorStatus.types';
import { DatabaseOperators, OPERATORS } from './DBClusterBasicOptions.constants';

export const DBClusterBasicOptions: FC<DBClusterBasicOptionsProps> = ({ kubernetes, form }) => {
  const { required } = validators;
  const { change } = form;
  const onChangeDatabase = useCallback((databaseType) => {
    if (databaseType.value !== Databases.mysql) {
      change(AddDBClusterFields.topology, DBClusterTopology.cluster);
    }

    change(AddDBClusterFields.databaseType, databaseType);
  }, []);

  const kubernetesOptions = kubernetes
    .map((kubernetesCluster) => {
      const { kubernetesClusterName, operators } = kubernetesCluster;

      const availableOperators = OPERATORS.filter(
        (databaseType) => operators[databaseType].status === KubernetesOperatorStatus.ok,
      );
      const disabledOperators = OPERATORS.filter(
        (databaseType) => operators[databaseType].status !== KubernetesOperatorStatus.ok,
      );

      const getOptionContent = (listOfOperators, kubernetesClusterName) => (
        <OptionContent
          title={kubernetesClusterName}
          description={
            disabledOperators.length
              ? Messages.dbcluster.addModal.validationMessages.notInstalledOperator
              : ''
          }
          tags={availableOperators.map((databaseType) => DatabaseOperators[databaseType])}
          disabledTags={disabledOperators.map((databaseType) => DatabaseOperators[databaseType])}
        />
      );

      return {
        value: kubernetesClusterName,
        label: getOptionContent(OPERATORS, kubernetesClusterName),
        operators,
        availableOperators,
      };
    })
    .filter((operators) => {
      operators.availableOperators.length > 0;
    });

  const [databaseOptions, setDatabaseOptions] = useState(DATABASE_OPTIONS);
  const onChangeCluster = useCallback((selectedKubernetes) => {
    const { operators } = selectedKubernetes;
    const availableDatabaseOptions: DatabaseOption[] = [];

    if (operators.xtradb.status === KubernetesOperatorStatus.ok) {
      availableDatabaseOptions.push({
        value: Databases.mysql,
        label: DATABASE_LABELS[Databases.mysql],
      });
    }

    if (operators.psmdb.status === KubernetesOperatorStatus.ok) {
      availableDatabaseOptions.push({
        value: Databases.mongodb,
        label: DATABASE_LABELS[Databases.mongodb],
      });
    }

    change(AddDBClusterFields.databaseType, {
      value: undefined,
      label: undefined,
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
        noOptionsMessage={Messages.dbcluster.addModal.noOperatorsMessage}
        validate={required}
        onChange={onChangeCluster}
      />
      <Field
        disabled={!form.getState().values[AddDBClusterFields.kubernetesCluster] || !databaseOptions.length}
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
