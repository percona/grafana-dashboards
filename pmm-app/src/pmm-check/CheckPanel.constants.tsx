import { Details, Failed } from './components';
import { SimpleOptions, Column, SeverityMap } from './types';

export const BASER_URL = '/alertmanager/api/v2';

export const DEFAULTS: SimpleOptions = {
  title: 'Failed Checks',
};

export const SEVERITY: SeverityMap = {
  error: 'Critical',
  warning: 'Major',
  info: 'Trivial',
};

export const COLUMNS: Column[] = [
  {
    title: 'Service name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'No of Failed Checks',
    dataIndex: 'failed',
    key: 'failed',
    render: Failed,
    width: 200,
  },
  {
    title: 'Details',
    dataIndex: 'details',
    key: 'details',
    render: Details,
  },
];

export const DATA_SOURCE = [
  {
    key: '1',
    name: 'sandbox-mysql.acme.com',
    // critical, major, trivial
    failed: [1, 1, 0],
    details: ['The root password is empty', 'MySQL 5.1 is not the latest major version'],
  },
  {
    key: '2',
    name: 'pmm-server-postgresql',
    failed: [0, 1, 0],
    details: ['PMM Server is not the latest major version'],
  },
  {
    key: '3',
    name: 'mongodb-inst-rpl-1',
    failed: [0, 1, 0],
    details: ['MongoDB admin password does not meet the complexity requirement'],
  },
];
