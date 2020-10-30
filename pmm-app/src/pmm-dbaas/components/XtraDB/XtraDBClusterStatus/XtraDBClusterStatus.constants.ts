import { XtraDBClusterStatus } from '../XtraDB.types';

export const STATUS_DATA_QA = {
  [XtraDBClusterStatus.changing]: 'pending',
  [XtraDBClusterStatus.deleting]: 'deleting',
  [XtraDBClusterStatus.failed]: 'failed',
  [XtraDBClusterStatus.invalid]: 'invalid',
  [XtraDBClusterStatus.ready]: 'active',
};
