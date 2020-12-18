import { Kubernetes } from '../Kubernetes.types';

export interface DeleteDBClusterModalProps {
  selectedCluster?: Kubernetes;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onClusterDeleted: () => void;
}
