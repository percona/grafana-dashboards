export interface OverviewServiceInterface {
  columns: string[];
  keyword?: string; // ?????
  labels: string[];
  limit?: number;
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
