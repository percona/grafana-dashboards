import { DatabasesType, QueryExampleResponseItem } from '../Details.types';

export interface ExampleInterface {
  databaseType: DatabasesType;
  examples: QueryExampleResponseItem[];
  loading?: boolean;
}
