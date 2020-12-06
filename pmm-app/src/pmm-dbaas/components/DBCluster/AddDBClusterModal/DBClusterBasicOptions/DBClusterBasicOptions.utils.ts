import { Messages } from 'pmm-dbaas/DBaaS.messages';

export const kubernetesClusterName = (value: string) => {
  const clusterNameRegexp = /^[a-z]([-a-z0-9]*[a-z0-9])?$/;

  return clusterNameRegexp.test(value)
    ? undefined
    : Messages.dbcluster.addModal.validationMessages.clusterName;
};
