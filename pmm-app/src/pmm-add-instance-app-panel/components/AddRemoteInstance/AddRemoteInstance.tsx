import React, { FC, useCallback, useState } from 'react';
import { Form as FormFinal } from 'react-final-form';
import { StepProgress } from '@percona/platform-core';
import { useTheme } from '@grafana/ui';
import AddRemoteInstanceService, { toPayload } from './AddRemoteInstance.service';
import { getInstanceData } from './AddRemoteInstance.tools';
import { getStyles } from './AddRemoteInstance.styles';
import { Messages } from './AddRemoteInstance.messages';
import { AdditionalOptionsFormPart, LabelsFormPart, MainDetailsFormPart } from './FormParts/FormParts';
import { AddRemoteInstanceProps } from './AddRemoteInstance.types';

const AddRemoteInstance: FC<AddRemoteInstanceProps> = ({ instance: { type, credentials } }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { instanceType, remoteInstanceCredentials, discoverName } = getInstanceData(type, credentials);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = { ...remoteInstanceCredentials };

  if (instanceType === 'MySQL') {
    initialValues.qan_mysql_perfschema = true;
  }

  const changePGTracking = useCallback(([newResolution], state: any, { changeValue }) => {
    changeValue(state, 'tracking', () => newResolution);
  }, []);

  const onSubmit = useCallback(
    async (values) => {
      const currentUrl = `${window.parent.location}`;
      const newURL = `${currentUrl.split('/graph/d/').shift()}/graph/d/pmm-inventory/`;

      const data = toPayload(values, discoverName);

      try {
        setLoading(true);

        if (values.isRDS) {
          await AddRemoteInstanceService.addRDS(data);
        } else {
          await AddRemoteInstanceService.addRemote(instanceType, data);
        }

        window.location.assign(newURL);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [instanceType],
  );

  const formRender = useCallback(
    ({ form, handleSubmit }) => {
      const steps = [
        {
          title: Messages.form.titles.mainDetails,
          fields: ['address', 'port', 'username', 'password'],
          render: () => <MainDetailsFormPart remoteInstanceCredentials={remoteInstanceCredentials} />,
        },
        {
          title: Messages.form.titles.labels,
          fields: ['topology', 'nodes', 'databaseType'],
          render: () => <LabelsFormPart />,
        },
        {
          title: Messages.form.titles.additionalOptions,
          fields: [],
          render: () => (
            <AdditionalOptionsFormPart
              remoteInstanceCredentials={remoteInstanceCredentials}
              loading={loading}
              form={form}
              instanceType={instanceType}
            />
          ),
        },
      ];

      return (
        <form onSubmit={handleSubmit} data-qa={'add-remote-instance-form'}>
          <h4>{`Add remote ${instanceType} Instance`}</h4>
          <StepProgress steps={steps} initialValues={initialValues} onSubmit={handleSubmit} />
        </form>
      );
    },
    [remoteInstanceCredentials, instanceType, loading, initialValues],
  );

  return (
    <div className={styles.formWrapper}>
      <FormFinal
        mutators={{ changePGTracking }}
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={formRender}
      />
    </div>
  );
};

export default AddRemoteInstance;
