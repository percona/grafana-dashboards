import { CheckPanelOptions, SeverityMap } from './types';

export const PMM_SETTINGS_URL = '/graph/d/pmm-settings/pmm-settings';

export const DEFAULTS: CheckPanelOptions = {
  title: 'Failed Database Checks',
};

export const SEVERITY: SeverityMap = {
  error: 'Critical',
  warning: 'Major',
  notice: 'Trivial',
};
