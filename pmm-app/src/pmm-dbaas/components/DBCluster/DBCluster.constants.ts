import { Databases, DATABASE_LABELS } from 'shared/core';

export const ADVANCED_SETTINGS_URL = '/graph/d/pmm-settings/pmm-settings?menu=advanced-settings';

export const DATABASE_OPTIONS = [{
  value: Databases.mysql,
  label: DATABASE_LABELS.mysql,
},
{
  value: Databases.mongodb,
  label: DATABASE_LABELS.mongodb,
}];
