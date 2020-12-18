import { DBCluster } from '../../DBCluster/DBCluster.types';

export interface DeleteDBClusterModalProps {
  selectedCluster?: DBCluster;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onClusterDeleted: () => void;
}
