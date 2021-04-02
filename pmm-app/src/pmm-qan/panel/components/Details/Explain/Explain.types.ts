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

interface ClassicExplainColumns {
  Header: string;
  key: string;
  accessor: string;
}

export interface ClassicExplainInterface {
  rows: object[];
  columns: ClassicExplainColumns[];
}
