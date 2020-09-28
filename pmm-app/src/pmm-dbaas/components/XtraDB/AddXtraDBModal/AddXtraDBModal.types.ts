import { SelectableValue } from '@grafana/data';
import { XtraDBCluster } from '../XtraDB.types';

export interface AddXtraDBModalProps {
  kubernetesOptions: SelectableValue[];
  isVisible: boolean;
  setVisible: (value: boolean) => void;
}
