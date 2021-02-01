import React, { FC, useCallback, useMemo } from 'react';
import { PasswordInputField, TextInputField, validators } from '@percona/platform-core';
import Validators from 'shared/components/helpers/validators';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { Button, useTheme } from '@grafana/ui';
import { Field } from 'react-final-form';
import { RadioButtonGroupAdapter } from 'shared/components/Form/FieldAdapters/FieldAdapters';
import { ExternalServiceConnectionDetailsFormPartProps } from '../FormParts.types';
import { getStyles } from '../FormParts.styles';
import { Messages } from '../FormParts.messages';
import { schemaOptions } from '../FormParts.constants';

export const ExternalServiceConnectionDetails: FC<ExternalServiceConnectionDetailsFormPartProps> = ({
  form,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const portValidators = useMemo(() => [validators.required, Validators.validatePort], []);

  const trim = useCallback((value) => (value ? value.trim() : value), []);
  const getUrlParts = (value) => {
    try {
      const url = new URL(form.getState().values.url);
      const protocol = url.protocol.replace(':', '');

      form.mutators.setValue('schema', protocol);
      form.mutators.setValue('address', url.hostname);
      form.mutators.setValue('port', url.port || (protocol === 'https' ? '443' : '80'));
      form.mutators.setValue('metrics_path', url.pathname);
      form.mutators.setValue('username', url.username);
      form.mutators.setValue('password', url.password);
    } catch (e) {
      console.log(e);
    }

    return value;
  };

  return (
    <div className={styles.groupWrapper}>
      <h4 className={styles.sectionHeader}>{Messages.form.titles.connectionDetails}</h4>
      <div className={styles.labelWrapper} data-qa="username-label">
        <span>{Messages.form.labels.externalService.group}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalService.group} icon="info-circle" />
      </div>
      <TextInputField name="group" />
      <div className={styles.labelWrapper} data-qa="username-label">
        <span>{Messages.form.labels.externalService.serviceName}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalService.serviceName} icon="info-circle" />
      </div>
      <TextInputField
        name="service_name"
        placeholder={Messages.form.placeholders.externalService.serviceName}
      />
      <div className={styles.labelWrapper} data-qa="address-label">
        <span>{Messages.form.labels.externalService.url}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalService.url} icon="info-circle" />
      </div>
      <div className={styles.urlFieldGroupWrapper}>
        <div className={styles.urlFieldWrapper}>
          <TextInputField name="url" placeholder={Messages.form.placeholders.externalService.url} />
        </div>
        <Button id="parseUrl" type="button" onClick={getUrlParts} data-qa="parse-url-button">
          {Messages.form.titles.parseURL}
        </Button>
      </div>
      <div className={styles.labelWrapper} data-qa="address-label">
        <span>{Messages.form.labels.externalService.schema}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalService.schema} icon="info-circle" />
      </div>
      <Field
        dataQa="http-schema-field"
        name="schema"
        options={schemaOptions}
        component={RadioButtonGroupAdapter}
      />
      <div className={styles.labelWrapper} data-qa="address-label">
        <span>{Messages.form.labels.externalService.address}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalService.address} icon="info-circle" />
      </div>
      <TextInputField
        name="address"
        placeholder={Messages.form.placeholders.externalService.address}
        validators={[validators.required]}
      />
      <div className={styles.labelWrapper} data-qa="service_name-label">
        <span>{Messages.form.labels.externalService.metricsPath}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalService.metricsPath} icon="info-circle" />
      </div>
      <TextInputField
        name="metrics_path"
        placeholder={Messages.form.placeholders.externalService.metricsPath}
      />
      <div className={styles.labelWrapper} data-qa="port-label">
        <span>{Messages.form.labels.externalService.port}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalService.port} icon="info-circle" />
      </div>
      <TextInputField name="port" placeholder="Port" validators={portValidators} />
      <div className={styles.labelWrapper} data-qa="username-label">
        <span>{Messages.form.labels.externalService.username}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalService.username} icon="info-circle" />
      </div>
      <TextInputField
        name="username"
        placeholder={Messages.form.placeholders.externalService.username}
        format={trim}
      />
      <div className={styles.labelWrapper} data-qa="password-label">
        <span>{Messages.form.labels.externalService.password}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.externalService.password} icon="info-circle" />
      </div>
      <PasswordInputField
        name="password"
        placeholder={Messages.form.placeholders.externalService.password}
        format={trim}
      />
    </div>
  );
};
