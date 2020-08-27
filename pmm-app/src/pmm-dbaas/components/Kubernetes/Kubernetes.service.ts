import { apiRequestManagement } from 'shared/components/helpers/api';
import { Kubernetes, KubernetesListAPI } from './Kubernetes.types';

export const KubernetesService = {
  getKubernetes() {
    return apiRequestManagement.post<KubernetesListAPI, any>('/DBaaS/Kubernetes/List', {});
  },
  deleteKubernetes(kubernetes: Kubernetes) {
    return apiRequestManagement.post<any, any>('/DBaaS/Kubernetes/Unregister', toAPI(kubernetes));
  },
};

const toAPI = (kubernetes: Kubernetes) => ({
  kubernetes_cluster_name: kubernetes.kubernetesClusterName
});
