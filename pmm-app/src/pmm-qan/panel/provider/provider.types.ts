export type QueryDimension = 'queryid' | 'service_name' | 'database' | 'schema' | 'username' | 'client_host';
export type DetailsTabs = 'details' | 'examples' | 'explain' | 'tables';

interface RawTime {
  from: string;
  to: string;
}

interface QueryAnalyticsPanelState {
  to: string;
  from: string;
  columns: any[];
  labels: any;
  pageNumber: number;
  pageSize: number;
  orderBy: string;
  queryId?: string;
  totals: boolean;
  querySelected: boolean;
  groupBy: QueryDimension;
  openDetailsTab: DetailsTabs;
  fingerprint?: string;
  controlSum?: string;
  rawTime: RawTime;
  loadingDetails?: boolean;
  dimensionSearchText?: string;
  database?: string;
}

export interface QueryAnalyticsContext {
  panelState: QueryAnalyticsPanelState;
  contextActions?: any;
}
