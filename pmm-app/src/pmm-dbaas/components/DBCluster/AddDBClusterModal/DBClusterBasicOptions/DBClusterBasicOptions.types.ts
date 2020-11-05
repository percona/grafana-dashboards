import { SelectableValue } from '@grafana/data';
import { FormApi } from 'final-form';

export interface DBClusterBasicOptionsProps {
  kubernetesOptions: SelectableValue[];
  form: FormApi;
}
