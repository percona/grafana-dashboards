import { Databases } from '../../../../../shared/core';
import { KubernetesOperatorStatus } from './KubernetesOperatorStatus.types';

export const OPERATORS_DOCS_URL = {
  [Databases.mysql]: 'https://www.percona.com/doc/kubernetes-operator-for-pxc/index.html',
  [Databases.mongodb]: 'https://www.percona.com/doc/kubernetes-operator-for-psmongodb/index.html',
};

export const STATUS_DATA_QA = {
  [KubernetesOperatorStatus.invalid]: 'invalid',
  [KubernetesOperatorStatus.ok]: 'ok',
  [KubernetesOperatorStatus.unsupported]: 'unsupported',
  [KubernetesOperatorStatus.unavailable]: 'unavailable',
};
