import React, { FC, useCallback, useMemo } from 'react';
import { PasswordInputField, TextInputField, validators } from '@percona/platform-core';
import Validators from 'shared/components/helpers/validators';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { useTheme } from '@grafana/ui';
import { MainDetailsFormPartProps } from '../FormParts.types';
import { getStyles } from '../FormParts.styles';
import { Messages } from '../FormParts.messages';

export const HAProxyConnectionDetails: FC<MainDetailsFormPartProps> = ({ remoteInstanceCredentials }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const portValidators = useMemo(() => [validators.required, Validators.validatePort], []);
  const trim = useCallback((value) => (value ? value.trim() : value), []);

  return (
    <div className={styles.groupWrapper}>
      <h4 className={styles.sectionHeader}>{Messages.form.titles.mainDetails}</h4>
      <div className={styles.labelWrapper} data-qa="address-label">
        <span>{Messages.form.labels.mainDetails.address}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.mainDetails.address} icon="info-circle" />
      </div>
      <TextInputField
        name="address"
        placeholder={Messages.form.placeholders.mainDetails.address}
        validators={[validators.required]}
      />
      <div className={styles.labelWrapper} data-qa="service-name-label">
        <span>{Messages.form.labels.mainDetails.serviceName}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.mainDetails.serviceName} icon="info-circle" />
      </div>
      <TextInputField name="serviceName" placeholder={Messages.form.placeholders.mainDetails.serviceName} />
      <div className={styles.labelWrapper} data-qa="port-label">
        <span>{Messages.form.labels.mainDetails.port}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.haproxy.port} icon="info-circle" />
      </div>
      <TextInputField
        name="port"
        placeholder={`Port (default: ${remoteInstanceCredentials.port} )`}
        validators={portValidators}
      />
      <div className={styles.labelWrapper} data-qa="username-label">
        <span>{Messages.form.labels.mainDetails.username}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.haproxy.username} icon="info-circle" />
      </div>
      <TextInputField
        name="username"
        placeholder={Messages.form.placeholders.mainDetails.username}
        format={trim}
      />
      <div className={styles.labelWrapper} data-qa="password-label">
        <span>{Messages.form.labels.mainDetails.password}</span>
        <LinkTooltip tooltipText={Messages.form.tooltips.haproxy.password} icon="info-circle" />
      </div>
      <PasswordInputField
        name="password"
        placeholder={Messages.form.placeholders.mainDetails.password}
        format={trim}
      />
    </div>
  );
};
