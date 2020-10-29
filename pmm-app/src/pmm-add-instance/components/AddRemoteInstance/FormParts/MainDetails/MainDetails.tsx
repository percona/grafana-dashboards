import React, { FC, useMemo } from 'react';
import { PasswordInputField, TextInputField, validators } from '@percona/platform-core';
import Validators from 'shared/components/helpers/validators';
import { MainDetailsFormPartProps } from '../FormParts.types';
import { getStyles } from '../FormParts.styles';
import { Messages } from '../FormParts.messages';

export const MainDetailsFormPart: FC<MainDetailsFormPartProps> = ({ remoteInstanceCredentials }) => {
  const styles = getStyles();

  const portValidators = useMemo(() => [validators.required, Validators.validatePort], []);

  return (
    <div className={styles.groupWrapper}>
      <h5>{Messages.form.titles.mainDetails}</h5>
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
        validators={portValidators}
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
