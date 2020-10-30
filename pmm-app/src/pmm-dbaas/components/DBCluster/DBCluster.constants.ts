import { Databases, DATABASE_LABELS } from 'shared/core';

export const DATABASE_OPTIONS = [{
  value: Databases.mysql,
  label: DATABASE_LABELS.mysql,
},
{
  value: Databases.mongodb,
  label: DATABASE_LABELS.mongodb,
}];
