import { isClusterChanging, getClusterStatus } from './DBCluster.utils';
import { dbClustersStub } from './__mocks__/dbClustersStubs';
import { DBClusterStatus } from './DBCluster.types';

const DBCLUSTER_STATUS_MAP = {
  [DBClusterStatus.invalid]: 'XTRA_DB_CLUSTER_STATE_INVALID',
  [DBClusterStatus.changing]: 'XTRA_DB_CLUSTER_STATE_CHANGING',
  [DBClusterStatus.ready]: 'XTRA_DB_CLUSTER_STATE_READY',
  [DBClusterStatus.failed]: 'XTRA_DB_CLUSTER_STATE_FAILED',
  [DBClusterStatus.deleting]: 'XTRA_DB_CLUSTER_STATE_DELETING',
  [DBClusterStatus.suspended]: 'XTRA_DB_CLUSTER_STATE_SUSPENDED',
};

describe('DBCluster.utils::', () => {
  it('returns true if cluster is changing', () => {
    const result = isClusterChanging({
      ...dbClustersStub[0],
      status: DBClusterStatus.changing,
    });

    expect(result).toBeTruthy();
  });
  it('returns true if cluster is deleting', () => {
    const result = isClusterChanging({
      ...dbClustersStub[0],
      status: DBClusterStatus.deleting,
    });

    expect(result).toBeTruthy();
  });
  it('returns false if cluster is ready', () => {
    const result = isClusterChanging({
      ...dbClustersStub[0],
      status: DBClusterStatus.ready,
    });

    expect(result).toBeFalsy();
  });
  it('returns false if cluster is invalid', () => {
    const result = isClusterChanging({
      ...dbClustersStub[0],
      status: DBClusterStatus.invalid,
    });

    expect(result).toBeFalsy();
  });
  it('returns false if cluster has no status', () => {
    const result = isClusterChanging({
      ...dbClustersStub[0],
    });

    expect(result).toBeFalsy();
  });
  it('returns invalid status when receives XTRA_DB_CLUSTER_STATE_INVALID', () => {
    const result = getClusterStatus('XTRA_DB_CLUSTER_STATE_INVALID', DBCLUSTER_STATUS_MAP);

    expect(result).toBe(DBClusterStatus.invalid);
  });
  it('returns ready status when receives XTRA_DB_CLUSTER_STATE_READY', () => {
    const result = getClusterStatus('XTRA_DB_CLUSTER_STATE_READY', DBCLUSTER_STATUS_MAP);

    expect(result).toBe(DBClusterStatus.ready);
  });
  it('returns failed status when receives undefined', () => {
    const result = getClusterStatus(undefined, DBCLUSTER_STATUS_MAP);

    expect(result).toBe(DBClusterStatus.failed);
  });
  it('returns failed status when status doesnt exist', () => {
    const result = getClusterStatus('XTRA_DB_CLUSTER_STATE_UNKNOWN', DBCLUSTER_STATUS_MAP);

    expect(result).toBe(DBClusterStatus.failed);
  });
});
