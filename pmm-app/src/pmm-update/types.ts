type OpaqueTag<S extends string> = {
  readonly __tag: S;
};

export type SuperOpaque<S extends string> = OpaqueTag<S>;
export type WeakOpaque<T, S extends string> = T & OpaqueTag<S>;
export type StrongOpaque<T, S extends string> = WeakOpaque<T, S> | SuperOpaque<S>;

export type ISOTimestamp = WeakOpaque<string, 'ISOTimestamp'>;

export interface GetUpdatesBody {
  force: boolean;
}

export interface GetUpdateStatusBody {
  auth_token: string;
  log_offset: number;
}

export interface GetUpdatesResponse {
  last_check: ISOTimestamp;
  latest: {
    full_version: string;
    timestamp: ISOTimestamp;
    version: string;
  };
  installed: {
    full_version: string;
    timestamp: ISOTimestamp;
    version: string;
  };
  latest_news_url: string;
  update_available: boolean;
}

export interface GetUpdateStatusResponse {
  done: boolean;
  log_offset: number;
  log_lines: string[];
}

export interface StartUpdateResponse {
  auth_token: string;
  log_offset: number;
}

export interface InstalledVersionDetails {
  installedVersion: string;
  installedFullVersion: string;
  installedVersionDate: string;
}

export interface NextVersionDetails {
  nextVersion: string;
  nextFullVersion: string;
  nextVersionDate: string;
  newsLink: string;
}

export type CurrentOrNextVersionDetails = [
  {
    installedVersionDetails?: InstalledVersionDetails;
    lastCheckDate?: string;
    nextVersionDetails?: NextVersionDetails;
    isUpdateAvailable?: boolean;
  },
  string,
  boolean,
  boolean,
  (forceUpdate?: boolean) => void
];
