//
// export interface DBClusterStatusProps {
//   status: DBClusterStatus;
// }

export enum KubernetesClusterStatus {
  invalid = 'OPERATORS_STATUS_INVALID',
  ok = 'OPERATORS_STATUS_OK',
  unsupported = 'OPERATORS_STATUS_UNSUPPORTED',
  unavailable = 'OPERATORS_STATUS_UNAVAILABLE',
}
