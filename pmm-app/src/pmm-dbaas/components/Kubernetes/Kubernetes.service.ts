import { apiRequestManagement } from 'shared/components/helpers/api';
import {
  Kubernetes,
  KubernetesListAPI,
  NewKubernetesCluster,
  NewKubernetesClusterAPI,
} from './Kubernetes.types';

export const KubernetesService = {
  async getKubernetes() {
    // "OPERATORS_STATUS_INVALID",
    //   "OPERATORS_STATUS_OK",
    //   "OPERATORS_STATUS_UNSUPPORTED",
    //   "OPERATORS_STATUS_UNAVAILABLE"
    return {
      kubernetes_clusters: [
        {
          kubernetes_cluster_name: 'test',
          operators: {
            pxc: {
              status: 'OPERATORS_STATUS_OK',
            },
            psmdb: {
              status: 'OPERATORS_STATUS_UNSUPPORTED',
            },
          },
        },
        {
          kubernetes_cluster_name: 'test',
          operators: {
            pxc: {
              status: 'OPERATORS_STATUS_UNAVAILABLE',
            },
            psmdb: {
              status: 'OPERATORS_STATUS_UNAVAILABLE',
            },
          },
        },
      ],
    };
    // return apiRequestManagement.post<KubernetesListAPI, any>('/DBaaS/Kubernetes/List', {});
  },
  deleteKubernetes(kubernetes: Kubernetes, force: boolean) {
    return apiRequestManagement.post<any, any>('/DBaaS/Kubernetes/Unregister', toAPI(kubernetes, force));
  },
  addKubernetes(kubernetes: NewKubernetesCluster) {
    return apiRequestManagement.post<NewKubernetesClusterAPI, any>(
      '/DBaaS/Kubernetes/Register',
      newClusterToApi(kubernetes),
    );
  },
};

const toAPI = (kubernetes: Kubernetes, force: boolean) => ({
  kubernetes_cluster_name: kubernetes.kubernetesClusterName,
  force,
});

const newClusterToApi = (newCluster: NewKubernetesCluster): NewKubernetesClusterAPI => ({
  kubernetes_cluster_name: newCluster.name,
  kube_auth: {
    kubeconfig: newCluster.kubeConfig,
  },
});
