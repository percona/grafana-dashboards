export enum Databases {
  postgresql = 'postgresql',
  mongodb = 'mongodb',
  mysql = 'mysql',
  proxysql = 'proxysql',
  haproxy = 'haproxy',
}

export interface Settings {
  updatesDisabled?: boolean;
}

export interface SettingsAPIResponse {
  settings: SettingsPayload;
}

export interface SettingsPayload {
  updates_disabled: boolean;
}
