import React, { FC, useState } from 'react';
import { CheckboxField, NumberInputField, validators } from '@percona/platform-core';
import { RadioButtonGroupAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { Databases } from 'shared/core';
import { useTheme } from '@grafana/ui';
import { RadioButtonGroup } from 'shared/components/Form/Radio/RadioButtonGroup';
import { Field as FieldWrapper } from 'shared/components/Form/FieldAdapters/Field';
import { Field } from 'react-final-form';
import { AdditionalOptionsFormPartProps, PostgreSQLAdditionalOptionsProps } from '../FormParts.types';
import { getStyles } from '../FormParts.styles';
import { Messages } from '../FormParts.messages';
import { trackingOptions } from '../FormParts.constants';
import { tablestatOptions } from './AdditionalOptions.constants';
import { TablestatOptions } from './AdditionalOptions.types';

export const AdditionalOptionsFormPart: FC<AdditionalOptionsFormPartProps> = ({
  instanceType,
  remoteInstanceCredentials,
  form,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.groupWrapper}>
      <h4 className={styles.sectionHeader}>{Messages.form.titles.additionalOptions}</h4>
      <div>
        <CheckboxField
          label={Messages.form.labels.additionalOptions.skipConnectionCheck}
          name="skip_connection_check"
        />
        <CheckboxField label={Messages.form.labels.additionalOptions.tls} name="tls" />
        <CheckboxField label={Messages.form.labels.additionalOptions.tlsSkipVerify} name="tls_skip_verify" />
        {getAdditionalOptions(instanceType, remoteInstanceCredentials, form)}
      </div>
    </div>
  );
};

export const PostgreSQLAdditionalOptions: FC<PostgreSQLAdditionalOptionsProps> = () => (
  <>
    <Field
      dataQa="tracking-options-radio-button-group"
      name="tracking"
      label={Messages.form.labels.trackingOptions}
      options={trackingOptions}
      component={RadioButtonGroupAdapter}
    />
  </>
);

const getTablestatValues = (type) => {
  switch (type) {
    case TablestatOptions.disabled:
      return -1;
    default:
      return 1000;
  }
};

const MySQLOptions = ({ form }) => {
  const [selectedValue, setSelectedValue] = useState<string>(TablestatOptions.disabled);

  return (
    <>
      <FieldWrapper label={Messages.form.labels.additionalOptions.tablestatOptions}>
        <RadioButtonGroup
          options={tablestatOptions}
          selected={selectedValue}
          name="tablestat-options"
          dataQa="tablestat-options-radio-button-group"
          onChange={(type) => {
            setSelectedValue(type);
            form.change('tablestats_group_table_limit', getTablestatValues(type));
          }}
        />
      </FieldWrapper>
      <NumberInputField
        name="tablestats_group_table_limit"
        defaultValue={-1}
        disabled={selectedValue !== TablestatOptions.custom}
        validate={validators.containsNumber}
      />
    </>
  );
};

export const getAdditionalOptions = (type, remoteInstanceCredentials, form) => {
  switch (type) {
    case Databases.postgresql:
      return <PostgreSQLAdditionalOptions />;
    case Databases.mysql:
      return (
        <>
          <MySQLOptions form={form} />
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
    case Databases.mongodb:
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
