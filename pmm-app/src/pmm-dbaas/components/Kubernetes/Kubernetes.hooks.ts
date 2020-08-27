import { useState, useEffect } from 'react';
import { filterFulfilled, processPromiseResults } from 'shared/components/helpers/promises';
import { showSuccessNotification } from 'shared/components/helpers';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { KubernetesService } from './Kubernetes.service';
import {
  Kubernetes, KubernetesAPI, KubernetesListAPI, DeleteKubernetesAction
} from './Kubernetes.types';

export const useKubernetes = (): [Kubernetes[], DeleteKubernetesAction, boolean] => {
  const [kubernetes, setKubernetes] = useState<Kubernetes[]>([]);
  const [loading, setLoading] = useState(false);
  const { kubernetes: { getDeletionStatus } } = Messages;

  const getKubernetes = async () => {
    setLoading(true);

    try {
      const results = await KubernetesService.getKubernetes() as KubernetesListAPI;

      setKubernetes(toModelList(results));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteKubernetes = async (kubernetesToDelete: Kubernetes[]) => {
    try {
      setLoading(true);

      const requests = kubernetesToDelete.map((k) => KubernetesService.deleteKubernetes(k));
      const results = await processPromiseResults(requests);
      const successfullyDeleted = results.filter(filterFulfilled).length;

      showSuccessNotification({ message: getDeletionStatus(successfullyDeleted, kubernetesToDelete.length) });
    } catch (e) {
      console.error(e);
    } finally {
      getKubernetes();
    }
  };

  useEffect(() => {
    getKubernetes();
  }, []);

  return [kubernetes, deleteKubernetes, loading];
};

const toModelList = (response: KubernetesListAPI): Kubernetes[] => (
  response.kubernetes_clusters ? response.kubernetes_clusters.map(toModel) : []
);

const toModel = (response: KubernetesAPI): Kubernetes => ({
  kubernetesClusterName: response.kubernetes_cluster_name
});
