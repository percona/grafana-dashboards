import { SelectableValue } from '@grafana/data';

export interface AddXtraDBModalProps {
  kubernetesOptions: SelectableValue[];
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onXtraDBAdded: () => void;
}

export enum AddXtraDBFields {
  name = 'name',
  kubernetesCluster = 'kubernetesCluster',
  databaseType = 'databaseType',
  topology = 'topology',
  nodes = 'nodes',
  single = 'single',
  resources = 'resources',
  memory = 'memory',
  cpu = 'cpu',
}
