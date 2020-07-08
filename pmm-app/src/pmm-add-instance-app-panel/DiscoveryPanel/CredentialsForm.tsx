import { Form as FormFinal } from 'react-final-form';
import React from 'react';
import { InputField } from '../../shared/components/Form/Input/Input';
import { PasswordField } from '../../shared/components/Form/Password/Password';

const SECURITY_CREDENTIALS_DOC_LINK = 'https://www.percona.com/doc/percona-monitoring-and-management/'
  + '2.x/install/aws.html#pmm-server-aws-running-instance';
const CredentialsForm = (props) => {
  const onSubmit = (values) => {
    props.onSetCredentials({ ...values });
  };

  return (
    <FormFinal
      onSubmit={onSubmit}
      validate={() => undefined}
      render={({ form, handleSubmit }) => (
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
              dataQa="add-account-username"
              placeholder="AMAZON_RDS_SECRET_ACCESS_KEY"
              required
            />
            <button type="submit" className="button button--dark" id="addInstance">
              Discover
            </button>
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

export default CredentialsForm;
