import { DatabasesType } from '../Details.types';

export interface TopQueryProps {
  databaseType: DatabasesType;
  query: string;
  queryId: string;
}
