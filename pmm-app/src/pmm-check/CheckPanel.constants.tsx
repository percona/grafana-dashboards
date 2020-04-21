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
