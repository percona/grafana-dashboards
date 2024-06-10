export enum Databases {
  postgresql = 'postgresql',
  mongodb = 'mongodb',
  mysql = 'mysql',
  proxysql = 'proxysql',
  haproxy = 'haproxy',
}

export interface Settings {
  updatesEnabled?: boolean;
}

export interface SettingsAPIResponse {
  settings: SettingsPayload;
}

export interface SettingsPayload {
  updates_enabled: boolean;
}

export interface PaginatedPayload {
  page_totals: {
    total_items: number;
    total_pages: number;
  };
}
