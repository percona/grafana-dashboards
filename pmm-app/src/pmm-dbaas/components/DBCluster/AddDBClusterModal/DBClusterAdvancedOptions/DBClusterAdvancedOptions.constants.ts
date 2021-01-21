import { SelectableValue } from '@grafana/data';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DBClusterTopology, DBClusterResources } from './DBClusterAdvancedOptions.types';

export const TOPOLOGY_OPTIONS: SelectableValue[] = [
  { key: DBClusterTopology.cluster, value: Messages.dbcluster.addModal.topology.cluster },
  { key: DBClusterTopology.single, value: Messages.dbcluster.addModal.topology.single },
];

export const RESOURCES_OPTIONS: SelectableValue[] = [
  { key: DBClusterResources.small, value: Messages.dbcluster.addModal.resources.small },
  { key: DBClusterResources.medium, value: Messages.dbcluster.addModal.resources.medium },
  { key: DBClusterResources.large, value: Messages.dbcluster.addModal.resources.large },
  { key: DBClusterResources.custom, value: Messages.dbcluster.addModal.resources.custom },
];

export const TOPOLOGIES_DISABLED = [DBClusterTopology.single];

export const DEFAULT_SIZES = {
  small: {
    memory: 2,
    cpu: 1,
    disk: 25,
  },
  medium: {
    memory: 8,
    cpu: 4,
    disk: 100,
  },
  large: {
    memory: 32,
    cpu: 8,
    disk: 500,
  },
};

export const INITIAL_VALUES = {
  topology: DBClusterTopology.cluster,
  nodes: 3,
  single: 1,
  resources: DBClusterResources.small,
  memory: DEFAULT_SIZES.small.memory,
  cpu: DEFAULT_SIZES.small.cpu,
  disk: DEFAULT_SIZES.small.disk,
};

export const MIN_NODES = 3;
export const MIN_RESOURCES = 0.1;
export const MIN_DISK_SIZE = 1;
