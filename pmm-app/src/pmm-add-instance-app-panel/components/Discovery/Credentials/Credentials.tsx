import { Form as FormFinal } from 'react-final-form';
import React, { FC } from 'react';
import { TextInputField, validators } from '@percona/platform-core';
import { Button, useTheme } from '@grafana/ui';
import { getStyles } from './Credentials.styles';
import { SECURITY_CREDENTIALS_DOC_LINK } from './Credentials.constants';

const Credentials: FC<any> = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const onSubmit = (values) => {
    props.onSetCredentials({ ...values });
  };

  return (
    <FormFinal
      onSubmit={onSubmit}
      render={({ form, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.instanceForm}>
          <div className={styles.searchPanel}>
            <TextInputField
              name="aws_access_key"
              placeholder="AMAZON_RDS_ACCESS_KEY_ID"
              validators={[validators.required]}
              fieldClassName={styles.credentialsField}
            />
            <TextInputField
              name="aws_secret_key"
              placeholder="AMAZON_RDS_SECRET_ACCESS_KEY"
              validators={[validators.required]}
              fieldClassName={styles.credentialsField}
            />
            <Button type="submit">Discover</Button>
          </div>
          <div>
            <a href={SECURITY_CREDENTIALS_DOC_LINK}>
              Where do I get the security credentials for my Amazon RDS DB instance
            </a>
          </div>
        </form>
      )}
    />
  );
};

export default Credentials;
