import Validators from 'shared/components/helpers/validators';
import { InstanceData } from './AddRemoteInstance.types';

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
export const validateInstanceForm = (values) => {
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
