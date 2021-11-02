import { DatabasesType } from '../Details.types';

export interface MetricsProps {
  databaseType: DatabasesType;
  metrics: any;
  textMetrics?: TextMetrics;
  totals: boolean;
  loading: boolean;
}

export interface TextMetrics {
  top_query?: string;
  top_queryid?: string;
}
