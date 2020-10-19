import {
  CheckboxField,
  PasswordInputField,
  TextareaInputField,
  TextInputField,
  validators,
} from '@percona/platform-core';
import React, { useState } from 'react';
import { Messages } from './AddRemoteInstance.messages';
// import { CheckboxField } from '../../../shared/components/Form';
import { TrackingOptions } from './AddRemoteInstance.types';
import { RadioButtonGroup } from '../../../shared/components/Form/Radio/RadioButtonGroup';
import { trackingOptions } from './AddRemoteInstance.constants';

export const MainDetailsFormPart = ({ remoteInstanceCredentials }) => (
  <div className="" style={{ width: '50%' }}>
    <TextInputField
      name="address"
      label={Messages.form.labels.mainDetails.address}
      placeholder="Hostname"
      validators={[validators.required]}
      disabled={remoteInstanceCredentials.isRDS}
    />
    <TextInputField
      name="service_name"
      label={Messages.form.labels.mainDetails.serviceName}
      placeholder="Service name (default: Hostname)"
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
      placeholder="Username"
      validators={[validators.required]}
      disabled={remoteInstanceCredentials.isRDS}
    />
    <PasswordInputField
      name="password"
      label={Messages.form.labels.mainDetails.password}
      placeholder="Password"
      validators={[validators.required]}
    />
  </div>
);
export const LabelsFormPart = () => (
  <div className="" style={{ width: '50%' }}>
    <TextInputField
      name="environment"
      label={Messages.form.labels.labels.environment}
      placeholder="Environment"
    />
    <TextInputField name="region" label={Messages.form.labels.labels.region} placeholder="Region" />
    <TextInputField name="az" label={Messages.form.labels.labels.az} placeholder="Availability Zone" />
    <TextInputField
      name="replication_set"
      label={Messages.form.labels.labels.replicationSet}
      placeholder="Replication set"
    />
    <TextInputField name="cluster" label={Messages.form.labels.labels.cluster} placeholder="Cluster" />
    <TextareaInputField
      name="custom_labels"
      label={Messages.form.labels.labels.customLabels}
      placeholder="Custom labels
      Format:
      key1:value1
      key2:value2"
    />
  </div>
);
export const PostgreSQLAdditionalOptions = ({ mutators }) => {
  const [trackingType, setTrackingType] = useState<string>(TrackingOptions.none);

  return (
    <>
      <RadioButtonGroup
        options={trackingOptions}
        selected={trackingType}
        name="tracking"
        dataQa="tracking-options-radio-button-group"
        onChange={(value) => {
          mutators.changePGTracking(value);
          setTrackingType(value);
        }}
      />
      <span className="description">{Messages.form.labels.trackingOptions}</span>
    </>
  );
};
export const getAdditionalOptions = (type, remoteInstanceCredentials, mutators) => {
  switch (type) {
    case 'PostgreSQL':
      return <PostgreSQLAdditionalOptions mutators={mutators} />;
    case 'MySQL':
      if (remoteInstanceCredentials.isRDS) {
        return (
          <>
            <CheckboxField label="Use performance schema" name="qan_mysql_perfschema" />
            <span className="description" />

            <CheckboxField label="Disable Basic Metrics" name="disable_basic_metrics" />
            <span className="description" />

            <CheckboxField label="Disable Enhanced Metrics" name="disable_enhanced_metrics" />
            <span className="description" />
          </>
        );
      }

      return (
        <>
          <CheckboxField label="Use performance schema" name="qan_mysql_perfschema" />
          <span className="description" />
        </>
      );
    case 'MongoDB':
      return (
        <>
          <CheckboxField label="Use QAN MongoDB Profiler" name="qan_mongodb_profiler" />
          <span className="description" />
        </>
      );
    default:
      return null;
  }
};
export const AdditionalOptionsFormPart = ({
  instanceType, loading, remoteInstanceCredentials, form,
}) => (
  <div style={{ width: '50%' }}>
    <div className="add-instance-panel" style={{ alignItems: 'flex-start' }}>
      <CheckboxField label="Skip connection check" name="skip_connection_check" />
      <CheckboxField label="Use TLS for database connections" name="tls" />
      <CheckboxField label="Skip TLS certificate and hostname validation" name="tls_skip_verify" />
      {getAdditionalOptions(instanceType, remoteInstanceCredentials, form.mutators)}
    </div>

    <div>
      <button type="submit" className="button button--dark" id="addInstance" disabled={loading}>
        Add service
      </button>
    </div>
  </div>
);
