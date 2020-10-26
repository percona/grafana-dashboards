export interface RemoteInstanceCredentials {
  port: number;
  isRDS: boolean;
}

export interface MainDetailsFormPartProps {
  remoteInstanceCredentials: any;
}

export interface AdditionalOptionsFormPartProps {
  instanceType?: string;
  loading: boolean;
  remoteInstanceCredentials: RemoteInstanceCredentials;
  form: any;
}

export interface PostgreSQLAdditionalOptionsProps {
  mutators: any;
}
