import { DatabasesType } from '../Details.types';
import { QueryDimension } from '../../../provider/provider.types';

export interface MetricsProps {
  databaseType: DatabasesType;
  metrics: any;
  textMetrics?: TextMetrics;
  totals: boolean;
  loading: boolean;
  groupBy: QueryDimension;
}

export interface HistogramRequest {
  queryid: string;
  labels: object;
  period_start_from: string;
  period_start_to: string;
}

export interface HistogramResponse {
  histogram_items: HistogramAPI[];
}

export interface HistogramAPI {
  range: string;
  frequency?: number;
}

export interface TextMetrics {
  top_query?: string;
  top_queryid?: string;
}
