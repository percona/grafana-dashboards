import { Databases } from './types';

export const API = {
  SETTINGS: '/v1/server/settings',
};

export const DATABASE_LABELS = {
  [Databases.mysql]: 'MySQL',
  [Databases.mongodb]: 'MongoDB',
  [Databases.postgresql]: 'PostgreSQL',
  [Databases.proxysql]: 'ProxySQL',
  [Databases.haproxy]: 'HAProxy',
};

export const SERVICE_ID_PREFIX = '/service_id/';
