// TODO: add credentials interface
export interface MainDetailsFormPartProps {
  remoteInstanceCredentials: any;
}

export interface AdditionalOptionsFormPartProps {
  instanceType: string;
  loading: boolean;
  remoteInstanceCredentials: any;
  form: any;
}

export interface PostgreSQLAdditionalOptionsProps {
  mutators: any;
}
