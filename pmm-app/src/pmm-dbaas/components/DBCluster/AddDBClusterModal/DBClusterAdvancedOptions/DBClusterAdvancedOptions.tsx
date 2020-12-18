import React, {
  FC, useCallback, useState, useMemo,
} from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { HorizontalGroup, useStyles } from '@grafana/ui';
import { LoaderButton, NumberInputField } from '@percona/platform-core';
import validators from 'shared/components/helpers/validators';
import { RadioButtonGroupAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { Databases } from 'shared/core';
import {
  TOPOLOGY_OPTIONS,
  RESOURCES_OPTIONS,
  DEFAULT_SIZES,
  MIN_NODES,
  MIN_RESOURCES,
  TOPOLOGIES_DISABLED, MIN_DISK_SIZE,
} from './DBClusterAdvancedOptions.constants';
import { getStyles } from './DBClusterAdvancedOptions.styles';
import { AddDBClusterFields } from '../AddDBClusterModal.types';
import { DBClusterTopology, DBClusterResources } from './DBClusterAdvancedOptions.types';
import { resourceValidator } from './DBClusterAdvancedOptions.utils';

export const DBClusterAdvancedOptions: FC<FormRenderProps> = ({
  values,
  form,
  valid,
  pristine,
  submitting,
}) => {
  const styles = useStyles(getStyles);
  const [customMemory, setCustomMemory] = useState(DEFAULT_SIZES.small.memory);
  const [customCPU, setCustomCPU] = useState(DEFAULT_SIZES.small.cpu);
  const [customDisk, setCustomDisk] = useState(DEFAULT_SIZES.small.disk);
  const { required, min } = validators;
  const { change } = form;
  const diskValidators = [required, min(MIN_DISK_SIZE)];
  const nodeValidators = [required, min(MIN_NODES)];
  const parameterValidators = [required, min(MIN_RESOURCES), resourceValidator];

  const {
    topology,
    resources,
    memory,
    cpu,
    databaseType,
    disk,
  } = values;
  const onChangeCustom = useCallback((value: string) => {
    if (resources === DBClusterResources.custom) {
      setCustomMemory(memory);
      setCustomCPU(cpu);
      setCustomDisk(disk);
    }

    if (value !== DBClusterResources.custom) {
      change(AddDBClusterFields.cpu, DEFAULT_SIZES[value].cpu);
      change(AddDBClusterFields.memory, DEFAULT_SIZES[value].memory);
      change(AddDBClusterFields.disk, DEFAULT_SIZES[value].disk);
    } else {
      change(AddDBClusterFields.cpu, customCPU);
      change(AddDBClusterFields.memory, customMemory);
      change(AddDBClusterFields.disk, customDisk);
    }

    change(AddDBClusterFields.resources, value);
  }, [resources, memory, cpu, customMemory, customCPU]);

  const parsePositiveInt = useCallback(
    (value) => (value > 0 && Number.isInteger(+value) ? value : undefined), [],
  );

  const parseNonNegativeFloat = useCallback(
    (value) => +(+value).toFixed(1).replace(/\.0+$/, ''), [],
  );
  const topologiesDisabled = useMemo(() => (
    databaseType?.value !== Databases.mysql ? TOPOLOGIES_DISABLED : []
  ), [databaseType]);

  return (
    <>
      <Field
        dataQa="dbcluster-topology-field"
        name={AddDBClusterFields.topology}
        label={Messages.dbcluster.addModal.fields.topology}
        options={TOPOLOGY_OPTIONS}
        disabledOptions={topologiesDisabled}
        component={RadioButtonGroupAdapter}
      />
      <div className={styles.nodesWrapper}>
        {topology === DBClusterTopology.single ? (
          <NumberInputField
            name={AddDBClusterFields.single}
            label={Messages.dbcluster.addModal.fields.nodes}
            disabled
          />
        ) : (
          <NumberInputField
            name={AddDBClusterFields.nodes}
            label={Messages.dbcluster.addModal.fields.nodes}
            validators={nodeValidators}
          />
        )}
      </div>
      <Field
        dataQa="dbcluster-resources-field"
        name={AddDBClusterFields.resources}
        label={Messages.dbcluster.addModal.fields.resources}
        options={RESOURCES_OPTIONS}
        component={RadioButtonGroupAdapter}
        onChange={onChangeCustom}
      />
      <div className={styles.resourcesWrapper}>
        <NumberInputField
          name={AddDBClusterFields.memory}
          label={Messages.dbcluster.addModal.fields.memory}
          validators={parameterValidators}
          disabled={resources !== DBClusterResources.custom}
          parse={parseNonNegativeFloat}
        />
        <NumberInputField
          name={AddDBClusterFields.cpu}
          label={Messages.dbcluster.addModal.fields.cpu}
          validators={parameterValidators}
          disabled={resources !== DBClusterResources.custom}
          parse={parseNonNegativeFloat}
        />
        <NumberInputField
          name={AddDBClusterFields.disk}
          label={Messages.dbcluster.addModal.fields.disk}
          validators={diskValidators}
          disabled={resources !== DBClusterResources.custom}
          parse={parsePositiveInt}
        />
      </div>
      <HorizontalGroup justify="center" spacing="md">
        <LoaderButton
          data-qa="dbcluster-create-cluster-button"
          size="md"
          variant="primary"
          disabled={!valid || pristine || submitting}
          loading={submitting}
          className={styles.createButton}
        >
          {Messages.dbcluster.addModal.confirm}
        </LoaderButton>
      </HorizontalGroup>
    </>
  );
};
