// import { DBClusterStatus } from '../DBCluster.types';
//
// export const STATUS_DATA_QA = {
//   [DBClusterStatus.changing]: 'pending',
//   [DBClusterStatus.deleting]: 'deleting',
//   [DBClusterStatus.failed]: 'failed',
//   [DBClusterStatus.invalid]: 'invalid',
//   [DBClusterStatus.ready]: 'active',
// };

import { Databases } from '../../../../../shared/core';

export const OPERATORS_DOCS_URL = {
  [Databases.mysql]: 'https://www.percona.com/doc/kubernetes-operator-for-pxc/index.html',
  [Databases.mongodb]: 'https://www.percona.com/doc/kubernetes-operator-for-psmongodb/index.html',
};
