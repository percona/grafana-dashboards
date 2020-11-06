import { RemoteInstanceCredentials } from 'pmm-add-instance/panel.types';
import { FormApi } from 'final-form';

export interface MainDetailsFormPartProps {
  remoteInstanceCredentials: RemoteInstanceCredentials;
}

export interface AdditionalOptionsFormPartProps {
  instanceType?: string;
  loading: boolean;
  remoteInstanceCredentials: RemoteInstanceCredentials;
  form: FormApi;
}

export interface PostgreSQLAdditionalOptionsProps {}
