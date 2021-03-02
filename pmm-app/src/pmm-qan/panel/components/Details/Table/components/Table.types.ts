import { DatabasesType } from '../../Details.types';

export interface TableProps {
  tableName: string;
  databaseType: DatabasesType;
  example: any;
  database?: string;
}
