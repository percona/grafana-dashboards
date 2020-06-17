import { DatabasesType } from '../Details.types';

export interface MetricsProps {
  databaseType: DatabasesType;
  metrics: any;
  totals: boolean;
  loading: boolean;
}
