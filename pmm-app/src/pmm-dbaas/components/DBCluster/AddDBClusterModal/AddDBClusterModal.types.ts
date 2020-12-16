import { SelectableValue } from '@grafana/data';

export interface AddDBClusterModalProps {
  kubernetesOptions: SelectableValue[];
  isVisible: boolean;
  showMonitoringWarning?: boolean;
  setVisible: (value: boolean) => void;
  onDBClusterAdded: () => void;
}

export enum AddDBClusterFields {
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
