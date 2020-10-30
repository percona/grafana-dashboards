import { isClusterChanging } from './DBCluster.utils';
import { dbClustersStub } from './__mocks__/dbClustersStubs';
import { DBClusterStatus } from './DBCluster.types';

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
});
