import { SelectableValue } from '@grafana/data';
import { FormApi } from 'final-form';
import { Kubernetes } from '../../../Kubernetes/Kubernetes.types';

export interface DBClusterBasicOptionsProps {
  kubernetesOptions: SelectableValue[];
  kubernetes: Kubernetes[];
  form: FormApi;
}
