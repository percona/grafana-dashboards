import { DatabasesType } from '../Details.types';

export interface TableContainerProps {
  databaseType: DatabasesType;
  examples: any[];
  tables: string[];
}
