import { QueryDimension } from '../../../panel.types';

export interface FingerprintProps {
  totals: boolean;
  query: any;
  queryId?: string;
  groupBy: QueryDimension;
  closeDetails: () => void;
}
