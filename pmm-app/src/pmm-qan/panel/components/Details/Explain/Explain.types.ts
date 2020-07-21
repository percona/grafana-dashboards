import { DatabasesType } from '../Details.types';

export interface ExplainProps {
  databaseType: DatabasesType;
  examples: any;
}

export enum ExplainTabs {
  json = 'JSON',
  classic = 'Classic'
}

interface ClassicExplainHeader {
  title: string,
  key: string,
  dataIndex: string
}

export interface ClassicExplain {
  rows: string[],
  columns: ClassicExplainHeader[]
}
