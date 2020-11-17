import { DBCluster } from '../DBCluster.types';

export interface EditDBClusterModalProps {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onDBClusterChanged: () => void;
  selectedCluster?: DBCluster;
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
