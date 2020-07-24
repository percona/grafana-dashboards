import { DatabasesType } from '../Details.types';

export interface ExampleInterface {
  fingerprint?: string;
  databaseType: DatabasesType;
  // TODO: update examples interface
  examples: any[];
  loading?: boolean;
}
