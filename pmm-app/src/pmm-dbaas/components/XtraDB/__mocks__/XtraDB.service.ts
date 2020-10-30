import { xtraDBClusterConnectionStub } from './xtraDBClustersStubs';

export class XtraDBService {
  showXtraDBCluster() {
    return xtraDBClusterConnectionStub;
  }

  getDBCluster() {
    return { connection_credentials: xtraDBClusterConnectionStub };
  }
}
