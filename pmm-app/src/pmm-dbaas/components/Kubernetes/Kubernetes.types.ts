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
