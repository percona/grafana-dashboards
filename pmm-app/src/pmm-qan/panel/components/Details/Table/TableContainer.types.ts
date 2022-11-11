import { DatabasesType } from '../Details.types';
import { FetchExplainsResult } from '../Explain/Explain.types';

export interface TableContainerProps extends FetchExplainsResult {
  databaseType: DatabasesType;
  database?: string;
  example?: any;
}
