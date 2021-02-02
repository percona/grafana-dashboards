import { DataSourcePlugin } from '@grafana/data';
import { PTSummaryDataSource } from './PTSummaryDataSource';
import QueryEditor from './ConfigEditor/ConfigEditor';

export const plugin = new DataSourcePlugin<PTSummaryDataSource>(PTSummaryDataSource).setQueryEditor(
  QueryEditor,
);
