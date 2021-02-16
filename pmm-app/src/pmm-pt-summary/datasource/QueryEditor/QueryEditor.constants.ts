import { Messages } from './QueryEditor.messages';
import { DatasourceType } from '../PTSummary.types';

export const DATASOURCES = [
  {
    value: DatasourceType.node,
    label: Messages.labels.nodePTSummary,
  },
  {
    value: DatasourceType.mysql,
    label: Messages.labels.mysqlPTSummary,
  },
  {
    value: DatasourceType.postgresql,
    label: Messages.labels.postgresqlPTSummary,
  },
  {
    value: DatasourceType.mongodb,
    label: Messages.labels.mongodbPTSummary,
  },
];
