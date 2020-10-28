import React, { FC } from 'react';
import { CheckboxField } from '@percona/platform-core';
import { Field } from 'react-final-form';
import { RadioButtonGroupAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { DATABASE_LABELS, Databases } from 'shared/core';
import { AdditionalOptionsFormPartProps, PostgreSQLAdditionalOptionsProps } from '../FormParts.types';
import { getStyles } from '../FormParts.styles';
import { Messages } from '../FormParts.messages';
import { trackingOptions } from '../FormParts.constants';

export const AdditionalOptionsFormPart: FC<AdditionalOptionsFormPartProps> = ({
  instanceType,
  remoteInstanceCredentials,
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
        {getAdditionalOptions(instanceType, remoteInstanceCredentials)}
      </div>
    </div>
  );
};
export const PostgreSQLAdditionalOptions: FC<PostgreSQLAdditionalOptionsProps> = () => (
  <Field
    dataQa="tracking-options-radio-button-group"
    name="tracking"
    label={Messages.form.labels.trackingOptions}
    options={trackingOptions}
    component={RadioButtonGroupAdapter}
  />
);
export const getAdditionalOptions = (type, remoteInstanceCredentials) => {
  switch (type) {
    case DATABASE_LABELS[Databases.postgresql]:
      return <PostgreSQLAdditionalOptions />;
    case DATABASE_LABELS[Databases.mysql]:
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
    case DATABASE_LABELS[Databases.mongodb]:
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
