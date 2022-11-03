import { DatabasesType, QueryExampleResponseItem } from '../Details.types';

export interface ExampleInterface {
  explainFingerprint?: string;
  databaseType: DatabasesType;
  examples: QueryExampleResponseItem[];
  loading?: boolean;
}
