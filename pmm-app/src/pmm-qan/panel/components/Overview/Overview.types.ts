export interface OverviewServiceInterface {
  columns: string[];
  keyword?: string;
  labels: string[];
  limit?: number;
  offset?: number;
  orderBy: string;
  from?: any;
  to?: any;
  pageSize: number;
  pageNumber: number;
  groupBy?: string;
  dimensionSearchText?: string;
}

interface RowInterface {
  dimension?: string;
}

export interface DataInterface {
  rows: RowInterface[];
  columns: any;
}
