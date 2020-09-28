import { SelectableValue } from '@grafana/data';

export interface AddXtraDBModalProps {
  kubernetesOptions: SelectableValue[];
  isVisible: boolean;
  setVisible: (value: boolean) => void;
}
