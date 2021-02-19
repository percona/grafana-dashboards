import { DATABASE_LABELS, Databases } from 'shared/core';
import { InstanceData } from './AddRemoteInstance.types';

export const getInstanceData = (instanceType, credentials): InstanceData => {
  const extractCredentials = (credentials): InstanceData => {
    if (!credentials) {
      return { remoteInstanceCredentials: {} };
    }

    return {
      remoteInstanceCredentials: {
        service_name: !credentials.isRDS ? credentials.address : credentials.instance_id,
        port: credentials.port,
        address: credentials.address,
        isRDS: credentials.isRDS,
        region: credentials.region,
        aws_access_key: credentials.aws_access_key,
        aws_secret_key: credentials.aws_secret_key,
        instance_id: credentials.instance_id,
        az: credentials.az,
      },
    };
  };

  const instance = extractCredentials(credentials);

  switch (instanceType) {
    case Databases.postgresql:
      instance.instanceType = DATABASE_LABELS[Databases.postgresql];
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 5432;
      break;
    case Databases.mysql:
      instance.instanceType = DATABASE_LABELS[Databases.mysql];
      instance.discoverName = 'DISCOVER_RDS_MYSQL';
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 3306;
      break;
    case Databases.mongodb:
      instance.instanceType = DATABASE_LABELS[Databases.mongodb];
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 27017;
      break;
    case Databases.proxysql:
      instance.instanceType = DATABASE_LABELS[Databases.proxysql];
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 6032;
      break;
    case Databases.haproxy:
      instance.instanceType = DATABASE_LABELS[Databases.haproxy];
      instance.remoteInstanceCredentials.port = instance.remoteInstanceCredentials.port || 8404;
      break;
    default:
      console.error('Not implemented');
  }

  return instance;
};
