import { ActionResult } from 'shared/components/Actions';

export type DatabasesType = 'mysql' | 'postgresql' | 'mongodb' | undefined;

export interface DetailsState {
  examples?: any;
  jsonExplain?: ActionResult;
  classicExplain?: ActionResult;
  tables?: any;
  databaseType?: DatabasesType;
}

export interface Details {
  contextActions: any;
  detailsState: DetailsState;
}

export interface QueryExampleResponse {
  query_examples: QueryExampleResponseItem[];
}

export interface QueryExampleResponseItem {
  example: string;
  example_type: string;
  example_format?: string;
  explain_fingerprint?: string;
  placeholders_count?: number;
  schema?: string;
  service_id: string;
  service_type: DatabasesType;
  tables?: string[];
  database?: string;
  query_id?: string;
}
