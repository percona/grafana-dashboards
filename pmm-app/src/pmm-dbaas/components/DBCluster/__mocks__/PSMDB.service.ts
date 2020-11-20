import { mongoDBClusterConnectionStub } from './dbClustersStubs';

export class PSMDBService {
  getDBCluster() {
    return { connection_credentials: mongoDBClusterConnectionStub };
  }

  restartDBCluster() {

  }
}
