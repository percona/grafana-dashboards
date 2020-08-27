import { Messages } from 'pmm-dbaas/DBaaS.messages';

export const KUBERNETES_COLUMNS = [
  {
    Header: Messages.kubernetes.table.nameColumn,
    accessor: 'kubernetesClusterName',
  },
];
