import { Messages } from './ConfigEditor.messages';
import { DatasourceType } from '../PTSummary.types';

export const DATASOURCE_OPTIONS = [
  {
    value: DatasourceType.node,
    label: Messages.titles.nodePTSummary,
  },
  {
    value: DatasourceType.mysql,
    label: Messages.titles.mysqlPTSummary,
  },
  {
    value: DatasourceType.postgresql,
    label: Messages.titles.postgresqlPTSummary,
  },
  {
    value: DatasourceType.mongodb,
    label: Messages.titles.mongodbPTSummary,
  },
];
