import { SelectableValue } from '@grafana/data';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { XtraDBTopology, XtraDBResources } from './XtraDBAdvancedOptions.types';

export const TOPOLOGY_OPTIONS: SelectableValue[] = [
  { key: XtraDBTopology.cluster, value: Messages.xtradb.addModal.topology.cluster },
  { key: XtraDBTopology.single, value: Messages.xtradb.addModal.topology.single },
];

export const RESOURCES_OPTIONS: SelectableValue[] = [
  { key: XtraDBResources.small, value: Messages.xtradb.addModal.resources.small },
  { key: XtraDBResources.medium, value: Messages.xtradb.addModal.resources.medium },
  { key: XtraDBResources.large, value: Messages.xtradb.addModal.resources.large },
  { key: XtraDBResources.custom, value: Messages.xtradb.addModal.resources.custom },
];

export const DEFAULT_SIZES = {
  small: {
    memory: 2,
    cpu: 1,
  },
  medium: {
    memory: 8,
    cpu: 4,
  },
  large: {
    memory: 32,
    cpu: 8,
  },
};

export const INITIAL_VALUES = {
  topology: XtraDBTopology.cluster,
  nodes: 3,
  single: 1,
  resources: XtraDBResources.small,
  memory: DEFAULT_SIZES.small.memory,
  cpu: DEFAULT_SIZES.small.cpu,
};

export const MIN_NODES = 3;
export const MIN_RESOURCES = 1;
