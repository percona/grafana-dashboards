import React, { FC, useCallback, useState } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { HorizontalGroup, useStyles } from '@grafana/ui';
import { LoaderButton, NumberInputField } from '@percona/platform-core';
import validators from 'shared/components/helpers/validators';
import { RadioButtonGroupAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import {
  TOPOLOGY_OPTIONS,
  RESOURCES_OPTIONS,
  DEFAULT_SIZES,
  MIN_NODES,
  MIN_RESOURCES,
} from './XtraDBAdvancedOptions.constants';
import { getStyles } from './XtraDBAdvancedOptions.styles';
import { AddXtraDBFields } from '../AddXtraDBModal.types';
import { XtraDBTopology, XtraDBResources } from './XtraDBAdvancedOptions.types';

export const XtraDBAdvancedOptions: FC<FormRenderProps> = ({
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
  const nodesValidators = [required, min(MIN_NODES)];
  const resourcesValidators = [required, min(MIN_RESOURCES)];
  const {
    topology,
    resources,
    memory,
    cpu,
  } = values;
  const onChangeCustom = useCallback((value: string) => {
    if (resources === XtraDBResources.custom) {
      setCustomMemory(memory);
      setCustomCPU(cpu);
    }

    if (value !== XtraDBResources.custom) {
      change(AddXtraDBFields.cpu, DEFAULT_SIZES[value].cpu);
      change(AddXtraDBFields.memory, DEFAULT_SIZES[value].memory);
    } else {
      change(AddXtraDBFields.cpu, customCPU);
      change(AddXtraDBFields.memory, customMemory);
    }

    change(AddXtraDBFields.resources, value);
  }, [resources, memory, cpu, customMemory, customCPU]);
  const parsePositiveInt = useCallback(
    (value) => (value > 0 && Number.isInteger(+value) ? value : undefined), [],
  );

  return (
    <>
      <Field
        dataQa="xtradb-topology-field"
        name={AddXtraDBFields.topology}
        label={Messages.xtradb.addModal.fields.topology}
        options={TOPOLOGY_OPTIONS}
        component={RadioButtonGroupAdapter}
      />
      <div className={styles.nodesWrapper}>
        {topology === XtraDBTopology.single ? (
          <NumberInputField
            name={AddXtraDBFields.single}
            label={Messages.xtradb.addModal.fields.nodes}
            disabled
          />
        ) : (
          <NumberInputField
            name={AddXtraDBFields.nodes}
            label={Messages.xtradb.addModal.fields.nodes}
            validators={nodesValidators}
          />
        )}
      </div>
      <Field
        dataQa="xtradb-resources-field"
        name={AddXtraDBFields.resources}
        label={Messages.xtradb.addModal.fields.resources}
        options={RESOURCES_OPTIONS}
        component={RadioButtonGroupAdapter}
        onChange={onChangeCustom}
      />
      <div className={styles.resourcesWrapper}>
        <NumberInputField
          name={AddXtraDBFields.memory}
          label={Messages.xtradb.addModal.fields.memory}
          validators={resourcesValidators}
          disabled={resources !== XtraDBResources.custom}
          parse={parsePositiveInt}
        />
        <NumberInputField
          name={AddXtraDBFields.cpu}
          label={Messages.xtradb.addModal.fields.cpu}
          validators={resourcesValidators}
          disabled={resources !== XtraDBResources.custom}
          parse={parsePositiveInt}
        />
      </div>
      <HorizontalGroup justify="center" spacing="md">
        <LoaderButton
          data-qa="xtradb-create-cluster-button"
          size="md"
          variant="primary"
          disabled={!valid || pristine || submitting}
          loading={submitting}
          className={styles.createButton}
        >
          {Messages.xtradb.addModal.confirm}
        </LoaderButton>
      </HorizontalGroup>
    </>
  );
};
