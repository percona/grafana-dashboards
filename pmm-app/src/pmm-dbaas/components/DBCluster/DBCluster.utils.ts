import { DBCluster, DBClusterStatus } from './DBCluster.types';

export const isClusterChanging = ({ status }: DBCluster) => (
  status === DBClusterStatus.changing || status === DBClusterStatus.deleting
);

export const getClusterStatus = (status: string | undefined, statusMap: object) => (
  status ? (statusMap[status] ? statusMap[status] : DBClusterStatus.failed) : DBClusterStatus.failed
);
