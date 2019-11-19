import React, { ReactElement } from 'react';
import './AddRemoteInstance.scss';
import { InputField } from '../../../react-plugins-deps/components/FieldsComponents/Input';
import { TextAreaField } from '../../../react-plugins-deps/components/FieldsComponents/TextArea';
import { CheckboxField } from '../../../react-plugins-deps/components/FieldsComponents/Checkbox';

import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import { PasswordField } from '../../../react-plugins-deps/components/FieldsComponents/Password';

interface InstanceData {
  instanceType?: string;
  defaultPort?: number;
  remoteInstanceCredentials?: any;
}

const extractCredentials = credentials => {
  const [service_name, port] = credentials.address.split(':');
  return {
    service_name,
    port,
    address: service_name,
  };
};
const getInstanceData = (instanceType, credentials) => {
  const instance: InstanceData = {};
  switch (instanceType) {
    case 'postgresql':
      instance.instanceType = 'PostgreSQL';
      instance.remoteInstanceCredentials = extractCredentials(credentials);
      instance.defaultPort = 5432;
      break;
    case 'mysql':
      instance.instanceType = 'MySQL';
      instance.remoteInstanceCredentials = extractCredentials(credentials);
      instance.defaultPort = 3306;
    case 'mongodb':
      instance.instanceType = 'MongoDB';
      instance.remoteInstanceCredentials = extractCredentials(credentials);
      instance.defaultPort = 27017;
      break;
    case 'proxysql':
      instance.instanceType = 'ProxySQL';
      instance.remoteInstanceCredentials = extractCredentials(credentials);
      instance.defaultPort = 6032;
      break;
  }

  return instance;
};

const getAdditionalOptions = (type, form) => {
  switch (type) {
    case 'PostgreSQL':
      return (
        <>
          <div className={'additional-options-wrapper'}>
            <CheckboxField form={form} name="remoteInstanceCredentials.qan_mysql_perfschema" data-cy="add-account-username" />
            <label className="description" htmlFor="tls_skip_verify">
              Use Pg Stat Statements{' '}
            </label>
          </div>
          <span className="description"></span>
        </>
      );
    case 'MySQL':
      return (
        <>
          <div className={'additional-options-wrapper'}>
            <CheckboxField form={form} name="remoteInstanceCredentials.qan_postgresql_pgstatements_agent" data-cy="add-account-username" />
            <label className="description" htmlFor="tls_skip_verify">
              Use performance schema
            </label>
          </div>
          <span className="description"></span>
        </>
      );
    case 'MongoDB':
      return (
        <>
          <div className={'additional-options-wrapper'}>
            <CheckboxField form={form} name="remoteInstanceCredentials.qan_mongodb_profiler" data-cy="add-account-username" />
            <label className="description" htmlFor="tls_skip_verify">
              Use QAN MongoDB Profiler
            </label>
          </div>
          <span className="description"></span>
        </>
      );
    default:
      return null;
  }
};
const AddRemoteInstance = props => {
  const { instanceType, remoteInstanceCredentials, defaultPort } = getInstanceData(props.instance.type, props.instance.credentials);

  const { form, handleSubmit } = useForm({
    onSubmit: values => {
      console.log(values);
    },
    // validate: () => {},
    initialValues: { remoteInstanceCredentials: remoteInstanceCredentials },
  });

  console.log(form);
  // @ts-ignore
  return (
    <form onSubmit={handleSubmit} className="add-instance-form app-theme-dark">
      <h5>{`Add remote ${instanceType} Instance`}</h5>
      <div className="add-instance-panel">
        <h6>Main details</h6>
        <span></span>
        <InputField form={form} name="remoteInstanceCredentials.address" data-cy="add-account-username" placeholder="*Hostname" required={true} />
        <span className="description">Public DNS hostname of your instance</span>

        <InputField
          form={form}
          name="remoteInstanceCredentials.service_name"
          data-cy="add-account-username"
          placeholder="Service name (default: Hostname)"
          required={true}
        />
        <span className="description">Service name to use.</span>

        <InputField
          form={form}
          name="remoteInstanceCredentials.port"
          data-cy="add-account-username"
          placeholder={`Port (default: ${defaultPort} )`}
          required={true}
        />
        <span className="description">Port your service is listening on</span>

        <InputField form={form} name="remoteInstanceCredentials.username" data-cy="add-account-username" placeholder="*Username" required={true} />
        <span className="description">Your database user name</span>

        <PasswordField form={form} name="remoteInstanceCredentials.password" data-cy="add-account-username" placeholder="*Password" required={true} />
        <span className="description">Your database password</span>
      </div>
      <div className="add-instance-panel">
        <h6>Labels</h6>
        <span></span>
        <InputField
          form={form}
          name="remoteInstanceCredentials.environment"
          data-cy="add-account-username"
          placeholder="Environment"
          required={true}
        />
        <span className="description"></span>

        <InputField
          form={form}
          name="remoteInstanceCredentials.replication_set"
          data-cy="add-account-username"
          placeholder="Replication set"
          required={true}
        />
        <span className="description"></span>

        <InputField form={form} name="remoteInstanceCredentials.cluster" data-cy="add-account-username" placeholder="Cluster" required={true} />
        <span className="description"></span>

        <TextAreaField
          form={form}
          name="customLabels"
          data-cy="add-account-username"
          placeholder="Custom labels
Format:
key1:value1
key2:value2"
        />
        <span className="description"></span>
      </div>
      <div className="add-instance-panel">
        <h6>Additional options</h6>
        <span></span>
        <div className={'additional-options-wrapper'}>
          <CheckboxField form={form} name="remoteInstanceCredentials.skip_connection_check" data-cy="add-account-username" />
          <label className="description" htmlFor="skip_connection_check">
            Skip connection check
          </label>
        </div>
        <span className="description"></span>
        <div className={'additional-options-wrapper'}>
          <CheckboxField form={form} name="remoteInstanceCredentials.tls" data-cy="add-account-username" />
          <label className="description" htmlFor="tls">
            Use TLS for database connections.
          </label>
        </div>
        <span className="description"></span>
        <div className={'additional-options-wrapper'}>
          <CheckboxField form={form} name="remoteInstanceCredentials.tls_skip_verify" data-cy="add-account-username" />
          <label className="description" htmlFor="tls_skip_verify">
            Skip TLS certificate and hostname validation
          </label>
        </div>
        <span className="description"></span>
        {getAdditionalOptions(instanceType, form)}
      </div>

      <div className="add-instance-form__submit-block">
        <button type="submit" className="button button--dark" id="addInstance">
          Add service
        </button>
      </div>
    </form>
  );
};

const FormWrapper = props => {
  return <FormFinal onSubmit={() => {}} render={({ handleSubmit }): ReactElement => <AddRemoteInstance {...props} />} />;
};
export default FormWrapper;
