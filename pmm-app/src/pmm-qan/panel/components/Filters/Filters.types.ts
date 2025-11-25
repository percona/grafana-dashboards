export interface FilterGroup {
  name: string;
  dataKey: string;
  getDashboardURL?: (value: string) => string;
}

export interface FilterItem {
  value: string;
  checked: boolean;
  main_metric_percent?: number;
}

export interface FilterData {
  name: FilterItem[];
}

export interface Filters {
  [key: string]: FilterData;
}
