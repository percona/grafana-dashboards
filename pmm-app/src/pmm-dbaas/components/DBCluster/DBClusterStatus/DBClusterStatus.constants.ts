import { DBClusterStatus } from '../DBCluster.types';

export const STATUS_DATA_QA = {
  [DBClusterStatus.changing]: 'pending',
  [DBClusterStatus.deleting]: 'deleting',
  [DBClusterStatus.failed]: 'failed',
  [DBClusterStatus.invalid]: 'invalid',
  [DBClusterStatus.ready]: 'active',
};
