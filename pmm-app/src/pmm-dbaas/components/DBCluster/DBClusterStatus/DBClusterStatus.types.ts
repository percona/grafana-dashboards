import { DBClusterStatus } from '../DBCluster.types';

export interface DBClusterStatusProps {
  status: DBClusterStatus;
  errorMessage: string;
}
