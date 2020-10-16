import React, { useState } from 'react';
import './AddRemoteInstance.scss';
import { Field, Form as FormFinal } from 'react-final-form';
import { InputField } from 'shared/components/Form/Input/Input';
import { TextAreaField } from 'shared/components/Form/TextArea/TextArea';
import { CheckboxField } from 'shared/components/Form/Checkbox/Checkbox';

import { PasswordField } from 'shared/components/Form/Password/Password';
import Validators from 'shared/components/helpers/validators';
import AddRemoteInstanceService from './AddRemoteInstanceService';
import { TrackingOptions } from './AddRemoteInstance.types';
import { StepProgress } from '@percona/platform-core';
import { getAdditionalOptions, getInstanceData } from './AddRemoteInstance.tools';
import { LinkTooltip } from '../../../shared/components/Elements/LinkTooltip/LinkTooltip';
import { Input, TextArea, useTheme } from '@grafana/ui';
import {
  MetricsResolutionIntervals,
  MetricsResolutionPresets,
} from '../../../pmm-settings/components/MetricsResolution/MetricsResolution.types';
import { NumericInputField } from '../../../shared/components/Form';
import { getStyles } from './AddRemoteInstance.styles';

const validateInstanceForm = (values) => {
  const errors = {} as any;

  errors.port = values.port ? Validators.validatePort(values.port) : '';
  errors.custom_labels = values.custom_labels ? Validators.validateKeyValue(values.custom_labels) : '';
  Object.keys(errors).forEach((errorKey) => {
    if (!errors[errorKey]) {
      delete errors[errorKey];
    }
  });

  return errors;
};
const AddRemoteInstance = (props) => {
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

  const AddInstanceForm = (props) => {
    const theme = useTheme();
    const styles = getStyles(theme);

    const { form } = props;
    const steps = [
      {
        title: 'Main details',
        fields: ['name', 'kubernetesCluster', 'databaseType'],
        render: () => (
          <div className="add-instance-form" style={{ width: '50%' }}>
            <div className={styles.label} data-qa="alertmanager-url-label">
              <span>{'Hostname'}</span>
              <LinkTooltip tooltipText={'Public DNS hostname of your instance'} icon="info-circle" />
            </div>
            <Field
              name="address"
              isEqual={() => {}}
              render={({ input }) => (
                <Input
                  {...input}
                  // className={styles.input}
                  data-qa="alertmanager-url"
                />
              )}
            />

            <div className={styles.label} data-qa="alertmanager-url-label">
              <span>{'Service name'}</span>
              <LinkTooltip tooltipText={'31231313'} icon="info-circle" />
            </div>
            <Field
              name="service_name"
              isEqual={() => {}}
              style={{ marginBottom: '10px' }}
              render={({ input }) => (
                <Input
                  {...input}
                  // className={styles.input}
                  data-qa="alertmanager-url"
                />
              )}
            />

            <div className={styles.label} data-qa="alertmanager-url-label">
              <span>{'Port'}</span>
              <LinkTooltip tooltipText={'Port your service is listening on'} icon="info-circle" />
            </div>
            <Field
              name="port"
              isEqual={() => {}}
              disabled={remoteInstanceCredentials.isRDS}
              render={({ input }) => (
                <Input
                  {...input}
                  // className={styles.input}
                  data-qa="alertmanager-url"
                />
              )}
            />

            <div style={{ display: 'flex', marginTop: '40px' }} data-qa="alertmanager-url-label">
              <span>{'Username'}</span>
              <LinkTooltip tooltipText={'Your database user name'} icon="info-circle" />
            </div>
            <Field
              name="username"
              isEqual={() => {}}
              render={({ input }) => (
                <Input
                  {...input}
                  // className={styles.input}
                  data-qa="alertmanager-url"
                />
              )}
            />

            <div className={styles.label} data-qa="alertmanager-url-label">
              <span>{'Password'}</span>
              <LinkTooltip tooltipText={'Your database password'} icon="info-circle" />
            </div>
            <Field
              name="password"
              isEqual={() => {}}
              render={({ input }) => (
                <Input
                  {...input}
                  // className={styles.input}
                  data-qa="alertmanager-url"
                />
              )}
            />

            {/*    old code */}
            {/*<div className="add-instance-panel">*/}
            {/*  <InputField*/}
            {/*    name="address"*/}
            {/*    placeholder="Hostname"*/}
            {/*    required*/}
            {/*    readonly={remoteInstanceCredentials.isRDS}*/}
            {/*  />*/}
            {/*  <span className="description">Public DNS hostname of your instance</span>*/}
            {/*  <InputField name="service_name" placeholder="Service name (default: Hostname)" />*/}
            {/*  <span className="description">Service name to use.</span>*/}
            {/*  <InputField*/}
            {/*    name="port"*/}
            {/*    placeholder={`Port (default: ${remoteInstanceCredentials.port} )`}*/}
            {/*    required*/}
            {/*    readonly={remoteInstanceCredentials.isRDS}*/}
            {/*  />*/}
            {/*  <span className="description">Port your service is listening on</span>*/}
            {/*</div>*/}
            {/*<div className="add-instance-panel">*/}
            {/*  <InputField name="username" placeholder="Username" required />*/}
            {/*  <span className="description">Your database user name</span>*/}

            {/*  <PasswordField name="password" placeholder="Password" required />*/}
            {/*  <span className="description">Your database password</span>*/}
            {/*</div>*/}
          </div>
        ),
      },
      {
        title: 'Labels',
        fields: ['topology', 'nodes', 'databaseType'],
        render: (renderProps) => (
          <div className="add-instance-form" style={{ width: '50%' }}>
            <div className={styles.label} data-qa="alertmanager-url-label">
              <span>{'Environment'}</span>
              {/*<LinkTooltip tooltipText={'Public DNS hostname of your instance'} icon="info-circle" />*/}
            </div>
            <Field
              name="environment"
              isEqual={() => {}}
              render={({ input }) => (
                <Input
                  {...input}
                  // className={styles.input}
                  data-qa="alertmanager-url"
                />
              )}
            />

            <div className={styles.label} data-qa="alertmanager-url-label">
              <span>{'Region'}</span>
              {/*<LinkTooltip tooltipText={'Public DNS hostname of your instance'} icon="info-circle" />*/}
            </div>
            <Field
              name="region"
              isEqual={() => {}}
              render={({ input }) => (
                <Input
                  {...input}
                  // className={styles.input}
                  data-qa="alertmanager-url"
                />
              )}
            />
            <div className={styles.label} data-qa="alertmanager-url-label">
              <span>{'Availability Zone'}</span>
              {/*<LinkTooltip tooltipText={'Public DNS hostname of your instance'} icon="info-circle" />*/}
            </div>
            <Field
              name="az"
              isEqual={() => {}}
              render={({ input }) => (
                <Input
                  {...input}
                  // className={styles.input}
                  data-qa="alertmanager-url"
                />
              )}
            />
            <div className={styles.label} data-qa="alertmanager-url-label">
              <span>{'Replication set'}</span>
              {/*<LinkTooltip tooltipText={'Public DNS hostname of your instance'} icon="info-circle" />*/}
            </div>
            <Field
              name="replication_set"
              isEqual={() => {}}
              render={({ input }) => (
                <Input
                  {...input}
                  // className={styles.input}
                  data-qa="alertmanager-url"
                  required={initialValues.isRDS}
                />
              )}
            />
            <div className={styles.label} data-qa="alertmanager-url-label">
              <span>{'Cluster'}</span>
              {/*<LinkTooltip tooltipText={'Public DNS hostname of your instance'} icon="info-circle" />*/}
            </div>
            <Field
              name="cluster"
              isEqual={() => {}}
              render={({ input }) => (
                <Input
                  {...input}
                  // className={styles.input}
                  data-qa="alertmanager-url"
                />
              )}
            />
            <div className={styles.label} data-qa="alertmanager-url-label">
              <span>{'Custom labels'}</span>
              {/*<LinkTooltip tooltipText={'Public DNS hostname of your instance'} icon="info-circle" />*/}
            </div>
            <Field
              name="custom_labels"
              render={({ input }) => (
                <TextArea {...input} data-qa="alertmanager-rules" />
              )}
            />

            {/* old code */}
            {/*            <div className="add-instance-panel">*/}
            {/*              <InputField name="environment" placeholder="Environment" />*/}
            {/*              <span className="description" />*/}

            {/*              <InputField name="region" required={initialValues.isRDS} placeholder="Region" />*/}
            {/*              <span className="description">Region</span>*/}

            {/*              <InputField name="az" placeholder="Availability Zone" />*/}
            {/*              <span className="description">Availability Zone</span>*/}

            {/*              <InputField name="replication_set" placeholder="Replication set" />*/}
            {/*              <span className="description" />*/}

            {/*              <InputField name="cluster" placeholder="Cluster" />*/}
            {/*              <span className="description" />*/}

            {/*              <TextAreaField*/}
            {/*                name="custom_labels"*/}
            {/*                placeholder="Custom labels*/}
            {/*Format:*/}
            {/*key1:value1*/}
            {/*key2:value2"*/}
            {/*              />*/}
            {/*              <span className="description" />*/}
            {/*            </div>*/}
          </div>
        ),
      },
      {
        title: 'Labels',
        fields: ['topology', 'nodes', 'databaseType'],
        render: (renderProps) => (
          <div className="add-instance-form" style={{ width: '50%' }}>
            <div className="add-instance-panel">
              <h6>Additional options</h6>
              <span />
              <CheckboxField label="Skip connection check" name="skip_connection_check" />

              <span className="description" />

              <CheckboxField label="Use TLS for database connections" name="tls" />

              <span className="description" />
              <CheckboxField
                label="Skip TLS certificate and hostname validation"
                name="tls_skip_verify"
                dataQa="add-account-username"
              />
              <span className="description" />
              {getAdditionalOptions(instanceType, remoteInstanceCredentials, form.mutators)}
            </div>

            <div className="add-instance-form__submit-block">
              <button type="submit" className="button button--dark" id="addInstance" disabled={loading}>
                Add service
              </button>
            </div>
          </div>
        ),
      },
    ];

    return (
      <>
        <h4>{`Add remote ${instanceType} Instance`}</h4>
        <StepProgress
          steps={steps}
          initialValues={{
            topology: 'cluster',
            nodes: 3,
            resources: 'small',
            memory: 1,
          }}
          onSubmit={({ name, kubernetesCluster, databaseType }) => {
            console.log(123);
          }}
        />
      </>
    );
  };

  return (
    <div id="antd" className="add-remote-instance-wrapper">
      <FormFinal
        mutators={{ changePGTracking }}
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validateInstanceForm}
        render={({ form, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="add-instance-form app-theme-dark">
            <AddInstanceForm form={form} />
          </form>
        )}
      />
    </div>
  );
};

export default AddRemoteInstance;
