import { DataSourcePlugin } from '@grafana/data';
import { PTSummaryDataSource } from './PTSummaryDataSource';

export const plugin = new DataSourcePlugin<PTSummaryDataSource>(PTSummaryDataSource);
