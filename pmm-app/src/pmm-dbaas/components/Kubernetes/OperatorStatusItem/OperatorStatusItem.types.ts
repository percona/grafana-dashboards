import { Databases } from 'shared/core';
import { KubernetesOperatorStatus } from './KubernetesOperatorStatus/KubernetesOperatorStatus.types';

export interface DBClusterConnectionItemProps {
  label: string;
  value: string | number;
  dataQa?: string;
  databaseType: Databases;
  status: KubernetesOperatorStatus;
}
