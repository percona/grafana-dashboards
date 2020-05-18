import { CheckPanelOptions, SeverityMap } from 'pmm-check/types';

export const PMM_SETTINGS_URL = '/graph/d/pmm-settings/pmm-settings';
export const PMM_DATABASE_CHECKS_PANEL_URL = '/graph/d/pmm-checks/pmm-database-checks';

export const DEFAULTS: CheckPanelOptions = {
  title: 'Failed Database Checks',
};

export const SEVERITY: SeverityMap = {
  error: 'Critical',
  warning: 'Major',
  notice: 'Trivial',
};
