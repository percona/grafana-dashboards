import { GetDBClustersAction } from '../DBCluster.types';
import { Kubernetes } from '../Kubernetes.types';

export interface DBClusterActionsProps {
  kubernetesCluster: Kubernetes;
  setSelectedCluster: (kubernetesCluster: Kubernetes) => void;
  setDeleteModalVisible: (isVisible: boolean) => void;
  setViewConfigModalVisible: (isVisible: boolean) => void;
  getDBClusters: GetDBClustersAction;
}
