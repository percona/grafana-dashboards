import React, { FC, useState } from 'react';
import { CheckboxField } from '@percona/platform-core';
import { Button } from '@grafana/ui';
import { AdditionalOptionsFormPartProps, PostgreSQLAdditionalOptionsProps } from '../FormParts.types';
import { getStyles } from '../FormParts.styles';
import { Messages } from '../FormParts.messages';
import { TrackingOptions } from '../../AddRemoteInstance.types';
import { RadioButtonGroup } from '../../../../../shared/components/Form/Radio/RadioButtonGroup';
import { trackingOptions } from '../FormParts.constants';

export const AdditionalOptionsFormPart: FC<AdditionalOptionsFormPartProps> = ({
  instanceType,
  loading,
  remoteInstanceCredentials,
  form,
}) => {
  const styles = getStyles();

  return (
    <div className={styles.groupWrapper}>
      <h5>{Messages.form.titles.additionalOptions}</h5>
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
