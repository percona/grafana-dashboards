import { DatabasesType, QueryExampleResponseItem } from '../Details.types';

export interface ExampleInterface {
  fingerprint?: string;
  databaseType: DatabasesType;
  examples: QueryExampleResponseItem[];
  loading?: boolean;
}
