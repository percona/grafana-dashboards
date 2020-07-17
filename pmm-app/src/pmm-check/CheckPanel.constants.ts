import { Details, Failed } from './components';
import { CheckPanelOptions, Column, SeverityMap } from './types';

export const PMM_SETTINGS_URL = '/graph/d/pmm-settings/pmm-settings';

export const DEFAULTS: CheckPanelOptions = {
  title: 'Failed Database Checks',
};

export const SEVERITIES_ORDER = {
  error: 0,
  warning: 1,
  notice: 2,
};

export const SEVERITY: SeverityMap = {
  error: 'Critical',
  warning: 'Major',
  notice: 'Trivial',
};

export const COLUMNS: Column[] = [
  {
    title: 'Service name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Failed Checks',
    dataIndex: 'failed',
    key: 'failed',
    render: Failed,
    width: 200,
  },
  {
    title: 'Severity',
    dataIndex: 'severity',
    key: 'severity',
  },
  {
    title: 'Details',
    dataIndex: 'details',
    key: 'details',
    render: Details,
  },
];
