import { XtraDBCluster, XtraDBClusterStatus } from './XtraDB.types';

export const isClusterChanging = ({ status }: XtraDBCluster) => (
  status === XtraDBClusterStatus.changing || status === XtraDBClusterStatus.deleting
);
