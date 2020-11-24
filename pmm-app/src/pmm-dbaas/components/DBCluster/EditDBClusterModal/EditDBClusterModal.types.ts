import { DBCluster } from '../DBCluster.types';
import { DBClusterResources } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions.types';

export interface EditDBClusterModalProps {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onDBClusterChanged: () => void;
  selectedCluster?: DBCluster;
}

export interface SelectedDBCluster extends DBCluster {
  topology?: string;
  resources?: DBClusterResources;
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
