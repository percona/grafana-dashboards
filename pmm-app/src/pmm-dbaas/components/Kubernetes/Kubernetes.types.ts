export interface KubernetesListAPI {
  kubernetes_clusters: KubernetesAPI[];
}

export interface KubernetesAPI {
  kubernetes_cluster_name: string;
}

export interface Kubernetes {
  kubernetesClusterName: string;
}

export type DeleteKubernetesAction = (kubernetesToDelete: Kubernetes[]) => void;
export type AddKubernetesAction = (kubernetesToAdd: NewKubernetesCluster) => void;


interface KubeAuth {
  kubeconfig: string;
}

export interface NewKubernetesClusterAPI {
  kubernetes_cluster_name: string;
  kube_auth: KubeAuth
}

export interface NewKubernetesCluster {
  name: string;
  kubeConfig: string;
}
