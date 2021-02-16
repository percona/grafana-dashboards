import { DataSourcePlugin } from '@grafana/data';
import { PTSummaryDataSource } from './PTSummaryDataSource';
import { ConfigEditor } from './ConfigEditor';
import { QueryEditor } from './QueryEditor/QueryEditor';

export const plugin = new DataSourcePlugin<PTSummaryDataSource>(PTSummaryDataSource)
  .setQueryEditor(QueryEditor)
  .setConfigEditor(ConfigEditor);
