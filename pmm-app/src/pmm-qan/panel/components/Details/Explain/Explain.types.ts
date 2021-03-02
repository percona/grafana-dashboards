import { DatabasesType } from '../Details.types';

export interface ExplainProps {
  databaseType: DatabasesType;
  examples: any;
}

export enum ExplainTabs {
  json = 'JSON',
  classic = 'Classic',
  visual = 'Visual',
}

export interface ClassicExplainInterface {
  rows: any[];
  columns: any[];
}
