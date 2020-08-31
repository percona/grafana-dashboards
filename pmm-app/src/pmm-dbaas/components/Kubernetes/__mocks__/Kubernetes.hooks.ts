import { Kubernetes, DeleteKubernetesAction } from '../Kubernetes.types';
import { kubernetesStub, deleteActionStub } from './kubernetesStubs';

export const useKubernetes = (): [Kubernetes[], DeleteKubernetesAction, boolean] => (
  [kubernetesStub, deleteActionStub, false]
);
