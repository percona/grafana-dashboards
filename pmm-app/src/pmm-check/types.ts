export interface SimpleOptions {
  title: string;
}

export interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: Record<string, any>) => React.ReactNode;
  width?: number;
}

export enum Severity {
  error = 'error',
  warning = 'warning',
  info = 'info',
}

export type SeverityMap = Record<Severity, string>;
