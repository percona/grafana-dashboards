export interface OverviewServiceInterface {
  columns: string[];
  first_seen: boolean;
  group_by: string;
  include_only_fields?: any[]; // ?????
  keyword?: string; // ?????
  labels: string[];
  limit?: number;
  main_metric: string;
  offset?: number;
  orderBy: string;
  from?: any; // ISO8601
  to?: any; // ISO8601
  pageSize: number;
  pageNumber: number;
  groupBy?: string;
}

interface RowInterface {
  dimension?: string;
}

export interface DataInterface {
  rows: RowInterface[];
  columns: any;
}
