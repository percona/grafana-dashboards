import { XtraDBClusterStatus } from '../XtraDB.types';

export interface XtraDBClusterStatusProps {
  status: XtraDBClusterStatus;
  errorMessage: string;
}
