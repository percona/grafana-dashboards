import React, { ReactElement, useState } from 'react';
import './AddRemoteInstance.scss';
import { Form as FormFinal } from 'react-final-form';
import { InputField } from '../../../react-plugins-deps/components/Form/Input/Input';
import { TextAreaField } from '../../../react-plugins-deps/components/Form/TextArea/TextArea';
import { CheckboxField } from '../../../react-plugins-deps/components/Form/Checkbox/Checkbox';

import { PasswordField } from '../../../react-plugins-deps/components/Form/Password/Password';
import AddRemoteInstanceService from './AddRemoteInstanceService';
import Validators from '../../../react-plugins-deps/components/helpers/validators';

interface InstanceData {
  instanceType?: string;
  defaultPort?: number;
  remoteInstanceCredentials?: any;
  discoverName?: string;
}

export const extractCredentials = (credentials) => ({
  service_name: !credentials.isRDS ? credentials.address : credentials.instance_id,
  port: credentials.port,
  address: credentials.address,
  isRDS: credentials.isRDS,
  region: credentials.region,
  aws_access_key: credentials.aws_access_key,
  aws_secret_key: credentials.aws_secret_key,
  instance_id: credentials.instance_id,
  az: credentials.az,
});
export const getInstanceData = (instanceType, credentials) => {
  const instance: InstanceData = {};
  instance.remoteInstanceCredentials = credentials ? extractCredentials(credentials) : {};
  switch (instanceType) {
    case 'postgresql':
      instance.instanceType = 'PostgreSQL';
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 5432;
      break;
    case 'mysql':
      instance.instanceType = 'MySQL';
      instance.discoverName = 'DISCOVER_RDS_MYSQL';
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 3306;
      break;
    case 'mongodb':
      instance.instanceType = 'MongoDB';
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 27017;
      break;
    case 'proxysql':
      instance.instanceType = 'ProxySQL';
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 6032;
      break;
    default:
      console.error('Not implemented');
  }

  return instance;
};

const getAdditionalOptions = (type, remoteInstanceCredentials) => {
  switch (type) {
    case 'PostgreSQL':
      return (
        <>
          <CheckboxField label="Use Pg Stat Statements" name="qan_postgresql_pgstatements_agent" />
          <span className="description" />
        </>
      );
    case 'MySQL':
      if (remoteInstanceCredentials.isRDS) {
        return (
          <>
            <CheckboxField label="Use performance schema" name="qan_mysql_perfschema" />
            <span className="description" />

            <CheckboxField label="Disable Basic Metrics" name="disable_basic_metrics" />
            <span className="description" />

            <CheckboxField label="Disable Enhanced Metrics" name="disable_enhanced_metrics" />
            <span className="description" />
          </>
        );
      }
      return (
        <>
          <CheckboxField label="Use performance schema" name="qan_mysql_perfschema" />
          <span className="description" />
        </>
      );
    case 'MongoDB':
      return (
        <>
          <CheckboxField label="Use QAN MongoDB Profiler" name="qan_mongodb_profiler" />
          <span className="description" />
        </>
      );
    default:
      return null;
  }
};

const validateInstanceForm = (values) => {
  const errors = {} as any;

  errors.port = values.port ? Validators.validatePort(values.port) : '';
  errors.custom_labels = values.custom_labels ? Validators.validateKeyValue(values.custom_labels) : '';
  Object.keys(errors).forEach((errorKey) => {
    if (!errors[errorKey]) {
      delete errors[errorKey];
    }
  });
  return errors;
};
const AddRemoteInstance = (props) => {
  const {
    instance: { type, credentials },
  } = props;
  const { instanceType, remoteInstanceCredentials, discoverName } = getInstanceData(
    type,
    credentials
  );
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = { ...remoteInstanceCredentials };
  if (instanceType === 'MySQL') {
    initialValues.qan_mysql_perfschema = true;
  }

  const onSubmit = async (values) => {
    const currentUrl = `${window.parent.location}`;
    const newURL = `${currentUrl.split('/graph/d/').shift()}/graph/d/pmm-inventory/`;

    const data = { ...values };
    if (values.custom_labels) {
      data.custom_labels = data.custom_labels
        .split(/[\n\s]/)
        .filter(Boolean)
        .reduce((acc, val) => {
          const [key, value] = val.split(':');
          acc[key] = value;
          return acc;
        }, {});
    }

    if (!data.service_name) {
      data.service_name = data.address;
    }

    if (data.add_node === undefined) {
      data.add_node = {
        node_name: data.service_name,
        node_type: 'REMOTE_NODE',
      };
    }

    if (discoverName) {
      data.engine = discoverName;
    }

    if (data.pmm_agent_id === undefined || data.pmm_agent_id === '') {
      data.pmm_agent_id = 'pmm-server'; // set default value for pmm agent id
    }

    setLoading(true);

    try {
      if (values.isRDS) {
        data.rds_exporter = true;
        await AddRemoteInstanceService.addRDS(data);
      } else {
        // remove rds fields from data
        await AddRemoteInstanceService.addRemote(instanceType, data);
      }
      setLoading(false);
      window.location.assign(newURL);
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <FormFinal
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validateInstanceForm}
      render={({ form, handleSubmit }): ReactElement => (
        <form onSubmit={handleSubmit} className="add-instance-form app-theme-dark">
          <h5>{`Add remote ${instanceType} Instance`}</h5>
          <div className="add-instance-panel">
            <h6>Main details</h6>
            <span />
            <InputField
              name="address"
              placeholder="Hostname"
              required
              readonly={remoteInstanceCredentials.isRDS}
            />
            <span className="description">Public DNS hostname of your instance</span>
            <InputField name="service_name" placeholder="Service name (default: Hostname)" />
            <span className="description">Service name to use.</span>
            <InputField
              name="port"
              placeholder={`Port (default: ${remoteInstanceCredentials.port} )`}
              required
              readonly={remoteInstanceCredentials.isRDS}
            />
            <span className="description">Port your service is listening on</span>
          </div>
          <div className="add-instance-panel">
            <InputField name="username" placeholder="Username" required />
            <span className="description">Your database user name</span>

            <PasswordField name="password" placeholder="Password" required />
            <span className="description">Your database password</span>
          </div>
          <div className="add-instance-panel">
            <h6>Labels</h6>
            <span />
            <InputField name="environment" placeholder="Environment" />
            <span className="description" />

            <InputField name="region" required={initialValues.isRDS} placeholder="Region" />
            <span className="description">Region</span>

            <InputField name="az" placeholder="Availability Zone" />
            <span className="description">Availability Zone</span>

            <InputField name="replication_set" placeholder="Replication set" />
            <span className="description" />

            <InputField name="cluster" placeholder="Cluster" />
            <span className="description" />

            <TextAreaField
              name="custom_labels"
              placeholder="Custom labels
Format:
key1:value1
key2:value2"
            />
            <span className="description" />
          </div>
          <div className="add-instance-panel">
            <h6>Additional options</h6>
            <span />
            <CheckboxField label="Skip connection check" name="skip_connection_check" />

            <span className="description" />

            <CheckboxField label="Use TLS for database connections" name="tls" />

            <span className="description" />
            <CheckboxField
              label="Skip TLS certificate and hostname validation"
              name="tls_skip_verify"
              dataQa="add-account-username"
            />
            <span className="description" />
            {getAdditionalOptions(instanceType, remoteInstanceCredentials)}
          </div>

          <div className="add-instance-form__submit-block">
            <button type="submit" className="button button--dark" id="addInstance" disabled={loading}>
              Add service
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default AddRemoteInstance;
