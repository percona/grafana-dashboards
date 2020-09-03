import { useState, useEffect } from 'react';
import { showSuccessNotification } from 'shared/components/helpers';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { KubernetesService } from './Kubernetes.service';
import {
  Kubernetes,
  KubernetesAPI,
  KubernetesListAPI,
  DeleteKubernetesAction,
  NewKubernetesCluster,
  AddKubernetesAction,
} from './Kubernetes.types';

export const useKubernetes = (): [Kubernetes[], DeleteKubernetesAction, AddKubernetesAction, boolean] => {
  const [kubernetes, setKubernetes] = useState<Kubernetes[]>([]);
  const [loading, setLoading] = useState(false);
  const { kubernetes: { deleteSuccess } } = Messages;

  const getKubernetes = async () => {
    setLoading(true);

    try {
      const results = (await KubernetesService.getKubernetes()) as KubernetesListAPI;

      setKubernetes(toModelList(results));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteKubernetes = async (kubernetesToDelete: Kubernetes) => {
    try {
      setLoading(true);
      await KubernetesService.deleteKubernetes(kubernetesToDelete);
      showSuccessNotification({ message: deleteSuccess });
    } catch (e) {
      console.error(e);
    } finally {
      getKubernetes();
    }
  };

  const addKubernetes = async (kubernetesToAdd: NewKubernetesCluster) => {
    try {
      setLoading(true);

      await KubernetesService.addKubernetes(kubernetesToAdd);
      showSuccessNotification({ message: Messages.kubernetes.messages.clusterAdded });
    } catch (e) {
      console.error(e);
    } finally {
      getKubernetes();
    }
  };

  useEffect(() => {
    getKubernetes();
  }, []);

  return [kubernetes, deleteKubernetes, addKubernetes, loading];
};

const toModelList = (response: KubernetesListAPI): Kubernetes[] => (
  (response.kubernetes_clusters ?? []).map(toModel)
);

const toModel = (response: KubernetesAPI): Kubernetes => ({
  kubernetesClusterName: response.kubernetes_cluster_name,
});
