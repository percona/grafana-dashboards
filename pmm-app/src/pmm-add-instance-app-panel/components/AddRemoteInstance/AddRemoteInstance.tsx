import React, { useState } from 'react';
import { Form as FormFinal } from 'react-final-form';
import { StepProgress } from '@percona/platform-core';
import { useTheme } from '@grafana/ui';
import AddRemoteInstanceService, { toPayload } from './AddRemoteInstance.service';
import { getInstanceData, validateInstanceForm } from './AddRemoteInstance.tools';
import { getStyles } from './AddRemoteInstance.styles';
import { Messages } from './AddRemoteInstance.messages';
import { AdditionalOptionsFormPart, LabelsFormPart, MainDetailsFormPart } from './FormParts/FormParts';

const AddRemoteInstance = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const {
    instance: { type, credentials },
  } = props;

  const { instanceType, remoteInstanceCredentials, discoverName } = getInstanceData(type, credentials);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = { ...remoteInstanceCredentials };

  const changePGTracking = ([newResolution], state: any, { changeValue }) => {
    changeValue(state, 'tracking', () => newResolution);
  };

  if (instanceType === 'MySQL') {
    initialValues.qan_mysql_perfschema = true;
  }

  const onSubmit = async (values) => {
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
  };

  const getSteps = (form) => [
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
    <div className={styles.formWrapper}>
      <FormFinal
        mutators={{ changePGTracking }}
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validateInstanceForm}
        render={({ form, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h4>{`Add remote ${instanceType} Instance`}</h4>
            <StepProgress steps={getSteps(form)} initialValues={initialValues} onSubmit={handleSubmit} />
          </form>
        )}
      />
    </div>
  );
};

export default AddRemoteInstance;
