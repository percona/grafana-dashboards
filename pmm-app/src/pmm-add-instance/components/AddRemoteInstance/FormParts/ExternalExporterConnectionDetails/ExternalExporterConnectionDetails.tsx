import React, { FC, useMemo } from 'react';
import { PasswordInputField, TextInputField, validators } from '@percona/platform-core';
import Validators from 'shared/components/helpers/validators';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { Button, useTheme } from '@grafana/ui';
import { Field } from 'react-final-form';
import { css } from 'emotion';
import { ExternalExporterConnectionDetailsFormPartProps } from '../FormParts.types';
import { getStyles } from '../FormParts.styles';
import { Messages } from '../FormParts.messages';
import { RadioButtonGroupAdapter } from '../../../../../shared/components/Form/FieldAdapters/FieldAdapters';
import { schemaOptions } from '../FormParts.constants';

export const ExternalExporterConnectionDetails: FC<ExternalExporterConnectionDetailsFormPartProps> = ({
  form,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const portValidators = useMemo(() => [validators.required, Validators.validatePort], []);

  const getUrlParts = (value) => {
    try {
      const url = new URL(form.getState().values.url);
      const protocol = url.protocol.replace(':', '');

      form.mutators.setValue('schema', protocol);
      form.mutators.setValue('address', url.hostname);
      form.mutators.setValue('port', url.port || protocol === 'https' ? '443' : '80');
      form.mutators.setValue('metrics_path', url.pathname);
    } catch (e) {
      console.log(e);
    }

    return value;
  };

  return (
    <div className={styles.groupWrapper}>
      <h4 className={styles.sectionHeader}>External exporter connection details</h4>
      <div className={styles.labelWrapper} data-qa="address-label">
        <span>{Messages.form.labels.externalExporter.url}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalExporter.url} icon="info-circle" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div
          className={css`
            width: 100%;
            margin-right: 5px;
          `}
        >
          <TextInputField
            name="url"
            placeholder={Messages.form.placeholders.externalExporter.url}
            validators={[validators.required]}
          />
        </div>
        <Button id="addInstance" type="button" onClick={getUrlParts}>
          Parse URL
        </Button>
      </div>
      <div className={styles.labelWrapper} data-qa="address-label">
        <span>{Messages.form.labels.externalExporter.schema}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalExporter.schema} icon="info-circle" />
      </div>
      <Field
        dataQa="http-schema-field"
        name="schema"
        options={schemaOptions}
        component={RadioButtonGroupAdapter}
      />
      <div className={styles.labelWrapper} data-qa="address-label">
        <span>{Messages.form.labels.externalExporter.address}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalExporter.address} icon="info-circle" />
      </div>
      <TextInputField
        name="address"
        placeholder={Messages.form.placeholders.externalExporter.address}
        validators={[validators.required]}
      />
      <div className={styles.labelWrapper} data-qa="service_name-label">
        <span>{Messages.form.labels.externalExporter.metricsPath}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalExporter.metricsPath} icon="info-circle" />
      </div>
      <TextInputField
        name="metrics_path"
        placeholder={Messages.form.placeholders.externalExporter.metricsPath}
      />
      <div className={styles.labelWrapper} data-qa="port-label">
        <span>{Messages.form.labels.externalExporter.port}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalExporter.port} icon="info-circle" />
      </div>
      <TextInputField name="port" placeholder="Port" validators={portValidators} />
      <div className={styles.labelWrapper} data-qa="username-label">
        <span>{Messages.form.labels.externalExporter.group}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalExporter.group} icon="info-circle" />
      </div>
      <TextInputField
        name="group"
        // validators={[validators.required]}
      />
      <div className={styles.labelWrapper} data-qa="username-label">
        <span>{Messages.form.labels.externalExporter.username}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalExporter.username} icon="info-circle" />
      </div>
      <TextInputField
        name="username"
        placeholder={Messages.form.placeholders.externalExporter.username}
        validators={[validators.required]}
      />
      <div className={styles.labelWrapper} data-qa="password-label">
        <span>{Messages.form.labels.externalExporter.password}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalExporter.password} icon="info-circle" />
      </div>
      <PasswordInputField
        name="password"
        placeholder={Messages.form.placeholders.externalExporter.password}
        validators={[validators.required]}
      />
    </div>
  );
};
