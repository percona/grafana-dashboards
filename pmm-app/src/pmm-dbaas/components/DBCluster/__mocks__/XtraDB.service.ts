import { xtraDBClusterConnectionStub } from './dbClustersStubs';

export class XtraDBService {
  getDBCluster() {
    return { connection_credentials: xtraDBClusterConnectionStub };
  }

  restartDBCluster() {

  }
}
