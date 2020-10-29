import { isClusterChanging } from './XtraDB.utils';
import { xtraDBClustersStub } from './__mocks__/xtraDBClustersStubs';
import { XtraDBClusterStatus } from './XtraDB.types';

describe('XtraDB.utils::', () => {
  it('returns true if cluster is changing', () => {
    const result = isClusterChanging({
      ...xtraDBClustersStub[0],
      status: XtraDBClusterStatus.changing,
    });

    expect(result).toBeTruthy();
  });
  it('returns true if cluster is deleting', () => {
    const result = isClusterChanging({
      ...xtraDBClustersStub[0],
      status: XtraDBClusterStatus.deleting,
    });

    expect(result).toBeTruthy();
  });
  it('returns false if cluster is ready', () => {
    const result = isClusterChanging({
      ...xtraDBClustersStub[0],
      status: XtraDBClusterStatus.ready,
    });

    expect(result).toBeFalsy();
  });
  it('returns false if cluster is invalid', () => {
    const result = isClusterChanging({
      ...xtraDBClustersStub[0],
      status: XtraDBClusterStatus.invalid,
    });

    expect(result).toBeFalsy();
  });
  it('returns false if cluster has no status', () => {
    const result = isClusterChanging({
      ...xtraDBClustersStub[0],
    });

    expect(result).toBeFalsy();
  });
});
