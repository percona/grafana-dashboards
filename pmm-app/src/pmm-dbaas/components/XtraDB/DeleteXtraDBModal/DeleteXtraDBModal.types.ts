import { XtraDBCluster } from '../XtraDB.types';

export interface DeleteXtraDBModalProps {
  selectedCluster?: XtraDBCluster;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onClusterDeleted: () => void;
}
