import { DatabasesType } from '../Details.types';

export interface MetricsProps {
  databaseType: DatabasesType;
  metrics: any;
  totals: boolean;
  loading: boolean;
}

export interface HistogramResponse {
  histogram_items: HistogramAPI[];
}

export interface HistogramAPI {
  range: string;
  frequency?: number;
}
