import { Databases } from 'shared/core';
import { KubernetesOperatorStatus } from './KubernetesOperatorStatus/KubernetesOperatorStatus.types';

export interface DBClusterConnectionItemProps {
  dataQa?: string;
  databaseType: Databases;
  status: KubernetesOperatorStatus;
}
