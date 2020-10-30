import { RemoteInstanceCredentials } from 'pmm-add-instance/panel.types';

export interface MainDetailsFormPartProps {
  remoteInstanceCredentials: RemoteInstanceCredentials;
}

export interface AdditionalOptionsFormPartProps {
  instanceType?: string;
  loading: boolean;
  remoteInstanceCredentials: RemoteInstanceCredentials;
  form: any;
}

export interface PostgreSQLAdditionalOptionsProps {}
