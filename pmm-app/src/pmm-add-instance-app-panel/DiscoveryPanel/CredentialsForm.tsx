import { Form as FormFinal } from 'react-final-form';
import React, { ReactElement } from 'react';
import { InputField } from '../../react-plugins-deps/components/FormComponents/Input/Input';
import { PasswordField } from '../../react-plugins-deps/components/FormComponents/Password/Password';

const SECURITY_CREDENTIALS_DOC_LINK =
  'https://www.percona.com/doc/percona-monitoring-and-management/' +
  '2.x/install/aws.html#pmm-server-aws-running-instance';
const CredentialsForm = props => {
  const onSubmit = values => {
    props.onSetCredentials({ ...values });
  };
  return (
    <FormFinal
      onSubmit={onSubmit}
      validate={() => {
        return undefined;
      }}
      render={({ form, handleSubmit }): ReactElement => {
        return (
          <form onSubmit={handleSubmit} className="discovery-instance-form app-theme-dark">
            <div className="discovery-search-panel">
              <InputField
                name="aws_access_key"
                placeholder="AMAZON_RDS_ACCESS_KEY_ID"
                required
                wrapperStyle={{ paddingRight: '10px' }}
              />
              <PasswordField
                name="aws_secret_key"
                data-cy="add-account-username"
                placeholder="AMAZON_RDS_SECRET_ACCESS_KEY"
                required
              />
              <button className="button button--dark" id="addInstance">
                Discover
              </button>
            </div>
            <div>
              <a href={SECURITY_CREDENTIALS_DOC_LINK}>
                Where do I get the security credentials for my Amazon RDS DB instance
              </a>
            </div>
          </form>
        );
      }}
    />
  );
};

export default CredentialsForm;
