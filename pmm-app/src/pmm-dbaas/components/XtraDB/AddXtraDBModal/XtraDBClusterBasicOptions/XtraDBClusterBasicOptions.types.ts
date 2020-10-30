import { SelectableValue } from '@grafana/data';
import { FormApi } from 'final-form';

export interface XtraDBClusterBasicOptionsProps {
  kubernetesOptions: SelectableValue[];
  form: FormApi;
}
