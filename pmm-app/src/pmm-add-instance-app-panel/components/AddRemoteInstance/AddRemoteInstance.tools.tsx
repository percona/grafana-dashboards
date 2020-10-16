import React, { useState } from 'react';
import { InstanceData, TrackingOptions } from './AddRemoteInstance.types';
import { RadioButtonGroup } from '../../../shared/components/Form/Radio/RadioButtonGroup';
import { trackingOptions } from './AddRemoteInstance.constants';
import { Messages } from './AddRemoteInstance.messages';
import { CheckboxField } from '../../../shared/components/Form';

export const extractCredentials = (credentials) => ({
  service_name: !credentials.isRDS ? credentials.address : credentials.instance_id,
  port: credentials.port,
  address: credentials.address,
  isRDS: credentials.isRDS,
  region: credentials.region,
  aws_access_key: credentials.aws_access_key,
  aws_secret_key: credentials.aws_secret_key,
  instance_id: credentials.instance_id,
  az: credentials.az,
});
export const getInstanceData = (instanceType, credentials) => {
  const instance: InstanceData = {};

  instance.remoteInstanceCredentials = credentials ? extractCredentials(credentials) : {};
  switch (instanceType) {
    case 'postgresql':
      instance.instanceType = 'PostgreSQL';
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 5432;
      break;
    case 'mysql':
      instance.instanceType = 'MySQL';
      instance.discoverName = 'DISCOVER_RDS_MYSQL';
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 3306;
      break;
    case 'mongodb':
      instance.instanceType = 'MongoDB';
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 27017;
      break;
    case 'proxysql':
      instance.instanceType = 'ProxySQL';
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 6032;
      break;
    default:
      console.error('Not implemented');
  }

  return instance;
};
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
