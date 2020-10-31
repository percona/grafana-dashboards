import { DBCluster, DBClusterStatus, DBClusterStatusMap } from './DBCluster.types';

export const isClusterChanging = ({ status }: DBCluster) => (
  status === DBClusterStatus.changing || status === DBClusterStatus.deleting
);

export const getClusterStatus = (
  status: string | undefined,
  statusMap: DBClusterStatusMap,
): DBClusterStatus => {
  const key = Object.keys(statusMap).find((key) => statusMap[key] === status) as DBClusterStatus;

  return key || DBClusterStatus.failed;
};
