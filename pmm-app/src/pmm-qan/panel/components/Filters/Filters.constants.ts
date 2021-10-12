import { Databases } from 'shared/core';
import { getServiceType } from './Filters.tools';

export const FILTERS_BODY_HEIGHT = 600;
export const FILTERS_HEADER_SIZE = 50;
export const FILTERS_MARGIN_BOTTOM = 20;

const subURL = '/graph/d/';

export const FILTERS_GROUPS = [
  {
    name: 'Environment',
    dataKey: 'environment',
  },
  {
    name: 'Cluster',
    dataKey: 'cluster',
    getDashboardURL: (value: string) => {
      const serviceType = getServiceType(value, 'cluster');
      let dashboardURL = '';

      if (serviceType === Databases.mysql) {
        dashboardURL = `pxc-cluster-summary/pxc-galera-cluster-summary?var-cluster=${value}`;
      } else if (serviceType === Databases.mongodb) {
        dashboardURL = `mongodb-cluster-summary/mongodb-cluster-summary?var-cluster=${value}`;
      }

      return dashboardURL ? `${subURL}${dashboardURL}` : '';
    },
  },
  {
    name: 'Replication Set',
    dataKey: 'replication_set',
    getDashboardURL: (value: string) => {
      const serviceType = getServiceType(value, 'replication_set');
      let dashboardURL = '';

      if (serviceType === Databases.mysql) {
        dashboardURL = `mysql-replicaset-summary/mysql-replication-summary?var-replication_set=${value}`;
      } else if (serviceType === Databases.mongodb) {
        dashboardURL = `mongodb-replicaset-summary/mongodb-replset-summary?var-replset=${value}`;
      }

      return dashboardURL ? `${subURL}${dashboardURL}` : '';
    },
  },
  {
    name: 'Database',
    dataKey: 'database',
  },
  {
    name: 'Schema',
    dataKey: 'schema',
  },
  {
    name: 'Node Name',
    dataKey: 'node_name',
    getDashboardURL: (value: string) => `${subURL}node-instance-summary/node-summary?var-node_name=${value}`,
  },
  {
    name: 'Service Name',
    dataKey: 'service_name',
    getDashboardURL: (value: string) => {
      const serviceType = getServiceType(value, 'service_name');

      return serviceType
        ? `${subURL}${serviceType}-instance-summary/${serviceType}-instance-summary?var-service_name=${value}`
        : '';
    },
  },
  {
    name: 'Client Host',
    dataKey: 'client_host',
  },
  {
    name: 'User Name',
    dataKey: 'username',
  },
  {
    name: 'Service Type',
    dataKey: 'service_type',
  },
  {
    name: 'Node Type',
    dataKey: 'node_type',
  },
  {
    name: 'City',
    dataKey: 'city',
  },
  {
    name: 'Availability Zone',
    dataKey: 'az',
  },
  {
    name: 'Application Name',
    dataKey: 'application_name',
  },
  {
    name: 'Command Type',
    dataKey: 'cmd_type',
  },
];
