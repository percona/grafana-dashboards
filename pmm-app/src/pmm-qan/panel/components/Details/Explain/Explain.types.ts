import { DatabasesType } from '../Details.types';

export interface ExplainProps {
  databaseType: DatabasesType;
  examples: any;
}

export enum ExplainTabs {
  json = 'JSON',
  classic = 'Classic',
  visual = 'Visual'
}

interface ClassicExplainHeader {
  title: string,
  key: string,
  dataIndex: string
}

export interface ClassicExplainInterface {
  rows: string[],
  columns: ClassicExplainHeader[]
}
