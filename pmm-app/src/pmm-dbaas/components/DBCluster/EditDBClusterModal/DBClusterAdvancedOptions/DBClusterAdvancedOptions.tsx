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
  TOPOLOGIES_DISABLED,
  MIN_RESOURCES,
} from './DBClusterAdvancedOptions.constants';
import { getStyles } from './DBClusterAdvancedOptions.styles';
import { EditDBClusterFields } from '../EditDBClusterModal.types';
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
  const { required, min } = validators;
  const { change } = form;
  const nodeValidators = [required, min(MIN_NODES)];
  const resourceValidators = [required, min(MIN_RESOURCES), resourceValidator];
  const {
    topology, resources, memory, cpu, databaseType,
  } = values;
  const onChangeCustom = useCallback(
    (value: string) => {
      if (resources === DBClusterResources.custom) {
        setCustomMemory(memory);
        setCustomCPU(cpu);
      }

      if (value !== DBClusterResources.custom) {
        change(EditDBClusterFields.cpu, DEFAULT_SIZES[value].cpu);
        change(EditDBClusterFields.memory, DEFAULT_SIZES[value].memory);
      } else {
        change(EditDBClusterFields.cpu, customCPU);
        change(EditDBClusterFields.memory, customMemory);
      }

      change(EditDBClusterFields.resources, value);
    },
    [resources, memory, cpu, customMemory, customCPU],
  );
  const parsePositiveInt = useCallback(
    (value) => (value > 0 && Number.isInteger(+value) ? value : undefined),
    [],
  );

  const parseNonNegativeFloat = useCallback((value) => +(+value).toFixed(1).replace(/\.0+$/, ''), []);

  const topologiesDisabled = useMemo(() => (databaseType !== Databases.mysql ? TOPOLOGIES_DISABLED : []), [
    databaseType,
  ]);

  return (
    <>
      <Field
        dataQa="dbcluster-topology-field"
        name={EditDBClusterFields.topology}
        label={Messages.dbcluster.addModal.fields.topology}
        options={TOPOLOGY_OPTIONS}
        disabledOptions={topologiesDisabled}
        component={RadioButtonGroupAdapter}
      />
      <div className={styles.nodesWrapper}>
        {topology === DBClusterTopology.single ? (
          <NumberInputField
            name={EditDBClusterFields.single}
            label={Messages.dbcluster.addModal.fields.nodes}
            disabled
          />
        ) : (
          <NumberInputField
            name={EditDBClusterFields.nodes}
            label={Messages.dbcluster.addModal.fields.nodes}
            validators={nodeValidators}
          />
        )}
      </div>
      <Field
        dataQa="dbcluster-resources-field"
        name={EditDBClusterFields.resources}
        label={Messages.dbcluster.addModal.fields.resources}
        options={RESOURCES_OPTIONS}
        component={RadioButtonGroupAdapter}
        onChange={onChangeCustom}
      />
      <div className={styles.resourcesWrapper}>
        <NumberInputField
          name={EditDBClusterFields.memory}
          label={Messages.dbcluster.addModal.fields.memory}
          validators={resourceValidators}
          disabled={resources !== DBClusterResources.custom}
          parse={parseNonNegativeFloat}
        />
        <NumberInputField
          name={EditDBClusterFields.cpu}
          label={Messages.dbcluster.addModal.fields.cpu}
          validators={resourceValidators}
          disabled={resources !== DBClusterResources.custom}
          parse={parseNonNegativeFloat}
        />
        <NumberInputField
          name={EditDBClusterFields.disk}
          label={Messages.dbcluster.addModal.fields.disk}
          disabled
          parse={parsePositiveInt}
        />
      </div>
      <HorizontalGroup justify="center" spacing="md">
        <LoaderButton
          data-qa="dbcluster-update-cluster-button"
          size="md"
          variant="primary"
          disabled={!valid || pristine || submitting}
          loading={submitting}
          className={styles.createButton}
        >
          {Messages.dbcluster.editModal.confirm}
        </LoaderButton>
      </HorizontalGroup>
    </>
  );
};
