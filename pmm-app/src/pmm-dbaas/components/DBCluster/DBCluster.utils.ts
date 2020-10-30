import { DBCluster, DBClusterStatus } from './DBCluster.types';

export const isClusterChanging = ({ status }: DBCluster) => (
  status === DBClusterStatus.changing || status === DBClusterStatus.deleting
);
