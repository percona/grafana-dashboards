import { Messages } from './ConfigEditor.messages';
import { DatasourceType } from '../PTSummary.types';

export const DATASOURCE_OPTIONS = [
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
