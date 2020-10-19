import React, { useState } from 'react';
import { Form as FormFinal } from 'react-final-form';
import {
  CheckboxField,
  PasswordInputField,
  StepProgress,
  TextareaInputField,
  TextInputField,
  validators,
} from '@percona/platform-core';
import AddRemoteInstanceService from './AddRemoteInstance.service';
import { TrackingOptions } from './AddRemoteInstance.types';
import { getAdditionalOptions, getInstanceData, validateInstanceForm } from './AddRemoteInstance.tools';
import { useTheme } from '@grafana/ui';
import { getStyles } from './AddRemoteInstance.styles';
import { Messages } from './AddRemoteInstance.messages';

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

    const data = { ...values };

    if (values.custom_labels) {
      data.custom_labels = data.custom_labels
        .split(/[\n\s]/)
        .filter(Boolean)
        .reduce((acc, val) => {
          const [key, value] = val.split(':');

          acc[key] = value;

          return acc;
        }, {});
    }

    switch (data.tracking) {
      case TrackingOptions.pgStatements:
        data.qan_postgresql_pgstatements_agent = true;
        break;
      case TrackingOptions.pgMonitor:
        data.qan_postgresql_pgstatmonitor_agent = true;
        break;
      default:
        delete data.tracking;
    }

    delete data.tracking;

    if (!data.service_name) {
      data.service_name = data.address;
    }

    if (data.add_node === undefined) {
      data.add_node = {
        node_name: data.service_name,
        node_type: 'REMOTE_NODE',
      };
    }

    if (discoverName) {
      data.engine = discoverName;
    }

    if (data.pmm_agent_id === undefined || data.pmm_agent_id === '') {
      data.pmm_agent_id = 'pmm-server'; // set default value for pmm agent id
    }

    setLoading(true);

    try {
      if (values.isRDS) {
        data.rds_exporter = true;
        await AddRemoteInstanceService.addRDS(data);
      } else {
        // remove rds fields from data
        await AddRemoteInstanceService.addRemote(instanceType, data);
      }

      setLoading(false);
      window.location.assign(newURL);
    } catch (e) {
      setLoading(false);
    }
  };

  const getSteps = (form) => {
    return [
      {
        title: 'Main details',
        fields: ['address', 'port', 'username', 'password'],
        render: () => (
          <div className="" style={{ width: '50%' }}>
            <TextInputField
              name="address"
              label={Messages.form.labels.mainDetails.address}
              placeholder={'Hostname'}
              validators={[validators.required]}
              disabled={remoteInstanceCredentials.isRDS}
            />
            <TextInputField
              name="service_name"
              label={Messages.form.labels.mainDetails.serviceName}
              placeholder={'Service name (default: Hostname)'}
            />
            <TextInputField
              name="port"
              label={Messages.form.labels.mainDetails.port}
              placeholder={`Port (default: ${remoteInstanceCredentials.port} )`}
              validators={[validators.required]}
            />
            <TextInputField
              name="username"
              label={Messages.form.labels.mainDetails.username}
              placeholder={'Username'}
              validators={[validators.required]}
              disabled={remoteInstanceCredentials.isRDS}
            />
            <PasswordInputField
              name="password"
              label={Messages.form.labels.mainDetails.password}
              placeholder={'Password'}
              validators={[validators.required]}
            />
          </div>
        ),
      },
      {
        title: 'Labels',
        fields: ['topology', 'nodes', 'databaseType'],
        render: (renderProps) => (
          <div className="" style={{ width: '50%' }}>
            <TextInputField
              name="environment"
              label={Messages.form.labels.labels.environment}
              placeholder={'Environment'}
              // validators={[validators.required]}
            />
            <TextInputField
              name="region"
              label={Messages.form.labels.labels.region}
              placeholder={'Region'}
              // validators={[validators.required]}
            />
            <TextInputField
              name="az"
              label={Messages.form.labels.labels.az}
              placeholder={'Availability Zone'}
              // validators={[validators.required]}
            />
            <TextInputField
              name="replication_set"
              label={Messages.form.labels.labels.replicationSet}
              placeholder={'Replication set'}
              // validators={[validators.required]}
              // required={initialValues.isRDS}
            />
            <TextInputField
              name="cluster"
              label={Messages.form.labels.labels.cluster}
              placeholder={'Cluster'}
              // validators={[validators.required]}
            />
            <TextareaInputField
              name="custom_labels"
              label={Messages.form.labels.labels.customLabels}
              placeholder="Custom labels
      Format:
      key1:value1
      key2:value2"
              // validators={[validators.required]}
            />
          </div>
        ),
      },
      {
        title: 'Additional options',
        fields: ['topology', 'nodes', 'databaseType'],
        render: (renderProps) => (
          <div className="" style={{ width: '50%' }}>
            <div className="add-instance-panel" style={{ alignItems: 'flex-start' }}>
              <CheckboxField label="Skip connection check" name="skip_connection_check" />

              <CheckboxField label="Use TLS for database connections" name="tls" />
              <CheckboxField
                label="Skip TLS certificate and hostname validation"
                name="tls_skip_verify"
                dataQa="tls_skip_verify"
              />
              {getAdditionalOptions(instanceType, remoteInstanceCredentials, form.mutators)}
            </div>

            <div>
              <button type="submit" className="button button--dark" id="addInstance" disabled={loading}>
                Add service
              </button>
            </div>
          </div>
        ),
      },
    ];
  };

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
