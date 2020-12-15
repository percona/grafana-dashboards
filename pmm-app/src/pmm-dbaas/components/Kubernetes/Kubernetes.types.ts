export interface KubernetesListAPI {
  kubernetes_clusters: KubernetesAPI[];
}

interface Operator {
  status: string;
}

interface OperatorsList {
  psmdb: Operator;
  xtradb: Operator;
}

export interface KubernetesAPI {
  kubernetes_cluster_name: string;
  operators: OperatorsList;
  status: string;
}

export interface Kubernetes {
  kubernetesClusterName: string;
  operators: OperatorsList;
  status: string;
}

export type DeleteKubernetesAction = (kubernetesToDelete: Kubernetes, force: boolean) => void;
export type AddKubernetesAction = (kubernetesToAdd: NewKubernetesCluster) => void;

interface KubeAuth {
  kubeconfig: string;
}

export interface NewKubernetesClusterAPI {
  kubernetes_cluster_name: string;
  kube_auth: KubeAuth;
}

export interface NewKubernetesCluster {
  name: string;
  kubeConfig: string;
}

export interface KubernetesProps {
  kubernetes: Kubernetes[];
  deleteKubernetes: DeleteKubernetesAction;
  addKubernetes: AddKubernetesAction;
  loading: boolean;
}
