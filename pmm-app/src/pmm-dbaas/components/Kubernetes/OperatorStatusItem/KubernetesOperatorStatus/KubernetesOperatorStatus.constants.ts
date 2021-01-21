import { Databases } from '../../../../../shared/core';
import { KubernetesOperatorStatus } from './KubernetesOperatorStatus.types';

export const OPERATORS_DOCS_URL = {
  [Databases.mysql]: 'https://per.co.na/x0wBC4',
  [Databases.mongodb]: 'https://per.co.na/03Clok',
};

export const STATUS_DATA_QA = {
  [KubernetesOperatorStatus.invalid]: 'invalid',
  [KubernetesOperatorStatus.ok]: 'ok',
  [KubernetesOperatorStatus.unsupported]: 'unsupported',
  [KubernetesOperatorStatus.unavailable]: 'unavailable',
};
