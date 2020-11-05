import { SelectableValue } from '@grafana/data';

export interface EditDBClusterModalProps {
  kubernetesOptions: SelectableValue[];
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onDBClusterAdded: () => void;
}

export enum EditDBClusterFields {
  name = 'name',
  kubernetesCluster = 'kubernetesCluster',
  databaseType = 'databaseType',
  topology = 'topology',
  nodes = 'nodes',
  single = 'single',
  resources = 'resources',
  memory = 'memory',
  cpu = 'cpu',
  disk = 'disk',
}
