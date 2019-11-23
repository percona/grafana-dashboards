import React, { ReactElement } from 'react';
import './AddRemoteInstance.scss';
import { InputField } from '../../../react-plugins-deps/components/FieldsComponents/Input/Input';
import { TextAreaField } from '../../../react-plugins-deps/components/FieldsComponents/TextArea/TextArea';
import { CheckboxField } from '../../../react-plugins-deps/components/FieldsComponents/Checkbox/Checkbox';

import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import { PasswordField } from '../../../react-plugins-deps/components/FieldsComponents/Password/Password';
import AddRemoteInstanceService from 'pmm-add-instance/AddInstance/AddRemoteInstance/AddRemoteInstanceService';

interface InstanceData {
  instanceType?: string;
  defaultPort?: number;
  remoteInstanceCredentials?: any;
}

const extractCredentials = credentials => {
  const [serviceName, port] = credentials.address.split(':');
  return {
    service_name: serviceName,
    port,
    address: serviceName,
  };
};
const getInstanceData = (instanceType, credentials) => {
  const instance: InstanceData = {};
  switch (instanceType) {
    case 'postgresql':
      instance.instanceType = 'PostgreSQL';
      instance.remoteInstanceCredentials = credentials ? extractCredentials(credentials) : {};
      instance.defaultPort = 5432;
      break;
    case 'mysql':
      instance.instanceType = 'MySQL';
      instance.remoteInstanceCredentials = credentials ? extractCredentials(credentials) : {};
      instance.defaultPort = 3306;
    case 'mongodb':
      instance.instanceType = 'MongoDB';
      instance.remoteInstanceCredentials = credentials ? extractCredentials(credentials) : {};
      instance.defaultPort = 27017;
      break;
    case 'proxysql':
      instance.instanceType = 'ProxySQL';
      instance.remoteInstanceCredentials = credentials ? extractCredentials(credentials) : {};
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
          <CheckboxField
            form={form}
            label={'Use Pg Stat Statements'}
            name="remoteInstanceCredentials.qan_mysql_perfschema"
            data-cy="add-account-username"
          />
          <span className="description"></span>
        </>
      );
    case 'MySQL':
      return (
        <>
          <CheckboxField
            form={form}
            label={'Use performance schema'}
            name="remoteInstanceCredentials.qan_postgresql_pgstatements_agent"
            data-cy="add-account-username"
          />
          <span className="description"></span>
        </>
      );
    case 'MongoDB':
      return (
        <>
          <CheckboxField
            form={form}
            label={'Use QAN MongoDB Profiler'}
            name="remoteInstanceCredentials.qan_mongodb_profiler"
            data-cy="add-account-username"
          />
          <span className="description"></span>
        </>
      );
    default:
      return null;
  }
};
const AddRemoteInstance = props => {
  const { instanceType, remoteInstanceCredentials, defaultPort } = getInstanceData(props.instance.type, props.instance.credentials);

  const onSubmit = values => {
    AddRemoteInstanceService.addMongodb(values);
    switch (instanceType) {
      case 'mysql':
        AddRemoteInstanceService.addMysql(values);
        break;
      case 'mongodb':
        AddRemoteInstanceService.addMongodb(values);
        break;
    }
  };
  // @ts-ignore
  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: onSubmit,
          initialValues: { remoteInstanceCredentials: remoteInstanceCredentials },
        });
        return (
          <form onSubmit={handleSubmit} className="add-instance-form app-theme-dark">
            <h5>{`Add remote ${instanceType} Instance`}</h5>
            <div className="add-instance-panel">
              <h6>Main details</h6>
              <span></span>
              <InputField
                form={form}
                name="remoteInstanceCredentials.address"
                data-cy="add-account-username"
                placeholder="*Hostname"
                required={true}
              />
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

              <InputField
                form={form}
                name="remoteInstanceCredentials.username"
                data-cy="add-account-username"
                placeholder="*Username"
                required={true}
              />
              <span className="description">Your database user name</span>

              <PasswordField
                form={form}
                name="remoteInstanceCredentials.password"
                data-cy="add-account-username"
                placeholder="*Password"
                required={true}
              />
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
                name="remoteInstanceCredentials.custom_labels"
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
              <CheckboxField
                form={form}
                label={'Skip connection check'}
                name="remoteInstanceCredentials.skip_connection_check"
                data-cy="add-account-username"
              />

              <span className="description"></span>

              <CheckboxField
                form={form}
                label={'Use TLS for database connections'}
                name="remoteInstanceCredentials.tls"
                data-cy="add-account-username"
              />

              <span className="description"></span>
              <CheckboxField
                form={form}
                label={'Skip TLS certificate and hostname validation'}
                name="remoteInstanceCredentials.tls_skip_verify"
                data-cy="add-account-username"
              />
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
      }}
    />
  );
};

export default AddRemoteInstance;
