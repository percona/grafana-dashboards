import {
  CheckboxField,
  PasswordInputField,
  TextareaInputField,
  TextInputField,
  validators,
} from '@percona/platform-core';
import React, { FC, useState } from 'react';
import { Button, useTheme } from '@grafana/ui';
import { RadioButtonGroup } from 'shared/components/Form/Radio/RadioButtonGroup';
import { Messages } from './FormParts.messages';
import { TrackingOptions } from '../AddRemoteInstance.types';
import { trackingOptions } from './FormParts.constants';
import { getStyles } from './FormParts.styles';
import {
  AdditionalOptionsFormPartProps,
  MainDetailsFormPartProps,
  PostgreSQLAdditionalOptionsProps,
} from './FormParts.types';

export const MainDetailsFormPart: FC<MainDetailsFormPartProps> = ({ remoteInstanceCredentials }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.groupWrapper}>
      <TextInputField
        name="address"
        label={Messages.form.labels.mainDetails.address}
        placeholder={Messages.form.placeholders.mainDetails.address}
        validators={[validators.required]}
        disabled={remoteInstanceCredentials.isRDS}
      />
      <TextInputField
        name="service_name"
        label={Messages.form.labels.mainDetails.serviceName}
        placeholder={Messages.form.placeholders.mainDetails.serviceName}
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
        placeholder={Messages.form.placeholders.mainDetails.username}
        validators={[validators.required]}
        disabled={remoteInstanceCredentials.isRDS}
      />
      <PasswordInputField
        name="password"
        label={Messages.form.labels.mainDetails.password}
        placeholder={Messages.form.placeholders.mainDetails.password}
        validators={[validators.required]}
      />
    </div>
  );
};
export const LabelsFormPart: FC<any> = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.groupWrapper}>
      <TextInputField
        name="environment"
        label={Messages.form.labels.labels.environment}
        placeholder={Messages.form.placeholders.labels.environment}
      />
      <TextInputField
        name="region"
        label={Messages.form.labels.labels.region}
        placeholder={Messages.form.placeholders.labels.region}
      />
      <TextInputField
        name="az"
        label={Messages.form.labels.labels.az}
        placeholder={Messages.form.placeholders.labels.az}
      />
      <TextInputField
        name="replication_set"
        label={Messages.form.labels.labels.replicationSet}
        placeholder={Messages.form.placeholders.labels.replicationSet}
      />
      <TextInputField
        name="cluster"
        label={Messages.form.labels.labels.cluster}
        placeholder={Messages.form.placeholders.labels.cluster}
      />
      <TextareaInputField
        name="custom_labels"
        label={Messages.form.labels.labels.customLabels}
        placeholder={Messages.form.placeholders.labels.customLabels}
      />
    </div>
  );
};

export const AdditionalOptionsFormPart: FC<AdditionalOptionsFormPartProps> = ({
  instanceType,
  loading,
  remoteInstanceCredentials,
  form,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.groupWrapper}>
      <div>
        <CheckboxField
          label={Messages.form.labels.additionalOptions.skipConnectionCheck}
          name="skip_connection_check"
        />
        <CheckboxField label={Messages.form.labels.additionalOptions.tls} name="tls" />
        <CheckboxField label={Messages.form.labels.additionalOptions.tlsSkipVerify} name="tls_skip_verify" />
        {getAdditionalOptions(instanceType, remoteInstanceCredentials, form.mutators)}
      </div>

      <div>
        <Button id="addInstance" disabled={loading} className={styles.addServiceButton}>
          Add service
        </Button>
      </div>
    </div>
  );
};

export const PostgreSQLAdditionalOptions: FC<PostgreSQLAdditionalOptionsProps> = ({ mutators }) => {
  const [trackingType, setTrackingType] = useState<string>(TrackingOptions.none);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span className="description">{Messages.form.labels.trackingOptions}</span>
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
    </div>
  );
};

export const getAdditionalOptions = (type, remoteInstanceCredentials, mutators) => {
  switch (type) {
    case 'PostgreSQL':
      return <PostgreSQLAdditionalOptions mutators={mutators} />;
    case 'MySQL':
      return (
        <>
          <CheckboxField
            label={Messages.form.labels.additionalOptions.qanMysqlPerfschema}
            name="qan_mysql_perfschema"
          />
          {remoteInstanceCredentials.isRDS ? (
            <>
              <CheckboxField
                label={Messages.form.labels.additionalOptions.disableBasicMetrics}
                name="disable_basic_metrics"
              />
              <CheckboxField
                label={Messages.form.labels.additionalOptions.disableEnchancedMetrics}
                name="disable_enhanced_metrics"
              />
            </>
          ) : null}
        </>
      );
    case 'MongoDB':
      return (
        <>
          <CheckboxField
            label={Messages.form.labels.additionalOptions.qanMongodbProfiler}
            name="qan_mongodb_profiler"
          />
        </>
      );
    default:
      return null;
  }
};
