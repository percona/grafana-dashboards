import { DatabasesType } from '../Details.types';

export interface TableContainerProps {
  databaseType: DatabasesType;
  database?: string;
  examples: any[];
}
