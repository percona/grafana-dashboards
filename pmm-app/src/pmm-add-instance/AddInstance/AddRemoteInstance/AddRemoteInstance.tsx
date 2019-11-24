import React, { ReactElement, useState } from 'react';
import './AddRemoteInstance.scss';
import { InputField } from '../../../react-plugins-deps/components/FieldsComponents/Input/Input';
import { TextAreaField } from '../../../react-plugins-deps/components/FieldsComponents/TextArea/TextArea';
import { CheckboxField } from '../../../react-plugins-deps/components/FieldsComponents/Checkbox/Checkbox';

import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import { PasswordField } from '../../../react-plugins-deps/components/FieldsComponents/Password/Password';
import AddRemoteInstanceService from 'pmm-add-instance/AddInstance/AddRemoteInstance/AddRemoteInstanceService';
import { Button } from 'antd';
import Validators from '../../../react-plugins-deps/components/validators/validators';
import { showErrorNotification, showSuccessNotification } from '../../../react-plugins-deps/components/helpers/notification-manager';

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
          <CheckboxField form={form} label={'Use Pg Stat Statements'} name="qan_mysql_perfschema" data-cy="add-account-username" />
          <span className="description"></span>
        </>
      );
    case 'MySQL':
      return (
        <>
          <CheckboxField form={form} label={'Use performance schema'} name="qan_postgresql_pgstatements_agent" data-cy="add-account-username" />
          <span className="description"></span>
        </>
      );
    case 'MongoDB':
      return (
        <>
          <CheckboxField form={form} label={'Use QAN MongoDB Profiler'} name="qan_mongodb_profiler" data-cy="add-account-username" />
          <span className="description"></span>
        </>
      );
    default:
      return null;
  }
};

const validateInstanceForm = values => {
  const errors = {};

  errors.port = Validators.validatePort(values.port);
  errors.custom_labels = Validators.validateKeyValue(values.custom_labels);
  console.log(errors);
  for (let propName in errors) {
    if (!errors[propName]) {
      delete errors[propName];
    }
  }
  return errors;
};
const AddRemoteInstance = props => {
  const { instanceType, remoteInstanceCredentials, defaultPort } = getInstanceData(props.instance.type, props.instance.credentials);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async values => {
    const currentUrl = `${window.parent.location}`;
    const newURL = currentUrl.split('/graph/d/').shift() + '/graph/d/pmm-inventory/';

    const data = Object.assign({}, values);
    data.custom_labels = data.custom_labels
      .split(/[\n\s]/)
      .filter(Boolean)
      .reduce((acc, val) => {
        const [key, value] = val.split(':');
        acc[key] = value;
        return acc;
      }, {});

    if (data.add_node === undefined) {
      data.add_node = {
        node_name: data.service_name,
        node_type: 'REMOTE_NODE',
      };
    }

    if (data.pmm_agent_id === undefined || data.pmm_agent_id === '') {
      data.pmm_agent_id = 'pmm-server'; // set default value for pmm agent id
    }

    setLoading(true);
    showSuccessNotification({ message: 'Instance added successfully' });
    try {
      await AddRemoteInstanceService.createInstance(instanceType, data);
      setLoading(false);
      window.location.assign(newURL);
      showSuccessNotification({ message: 'Instance added successfully' });
    } catch (e) {
      setLoading(false);
      showErrorNotification({ message: e.message });
    }
  };
  // @ts-ignore
  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: onSubmit,
          validate: validateInstanceForm,
          initialValues: { ...remoteInstanceCredentials },
        });
        return (
          <form onSubmit={handleSubmit} className="add-instance-form app-theme-dark">
            <h5>{`Add remote ${instanceType} Instance`}</h5>
            <div className="add-instance-panel">
              <h6>Main details</h6>
              <span></span>
              <InputField form={form} name="address" data-cy="add-account-username" placeholder="*Hostname" required={true} />
              <span className="description">Public DNS hostname of your instance</span>

              <InputField
                form={form}
                name="service_name"
                data-cy="add-account-username"
                placeholder="Service name (default: Hostname)"
                required={true}
              />
              <span className="description">Service name to use.</span>

              <InputField form={form} name="port" data-cy="add-account-username" placeholder={`Port (default: ${defaultPort} )`} required={true} />
              <span className="description">Port your service is listening on</span>

              <InputField form={form} name="username" data-cy="add-account-username" placeholder="*Username" required={true} />
              <span className="description">Your database user name</span>

              <PasswordField form={form} name="password" data-cy="add-account-username" placeholder="*Password" required={true} />
              <span className="description">Your database password</span>
            </div>
            <div className="add-instance-panel">
              <h6>Labels</h6>
              <span></span>
              <InputField form={form} name="environment" data-cy="add-account-username" placeholder="Environment" required={true} />
              <span className="description"></span>

              <InputField form={form} name="replication_set" data-cy="add-account-username" placeholder="Replication set" required={true} />
              <span className="description"></span>

              <InputField form={form} name="cluster" data-cy="add-account-username" placeholder="Cluster" required={true} />
              <span className="description"></span>

              <TextAreaField
                form={form}
                name="custom_labels"
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
              <CheckboxField form={form} label={'Skip connection check'} name="skip_connection_check" data-cy="add-account-username" />

              <span className="description"></span>

              <CheckboxField form={form} label={'Use TLS for database connections'} name="tls" data-cy="add-account-username" />

              <span className="description"></span>
              <CheckboxField
                form={form}
                label={'Skip TLS certificate and hostname validation'}
                name="tls_skip_verify"
                data-cy="add-account-username"
              />
              <span className="description"></span>
              {getAdditionalOptions(instanceType, form)}
            </div>

            <div className="add-instance-form__submit-block">
              <button type="submit" className="button button--dark" id="addInstance" disabled={loading}>
                Add service
              </button>
              {/*<Button htmlType="submit" type="primary" loading className="button button--dark">*/}
              {/*  Add service*/}
              {/*</Button>*/}
            </div>
          </form>
        );
      }}
    />
  );
};

export default AddRemoteInstance;
