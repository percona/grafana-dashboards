import { mongoDBClusterConnectionStub } from './xtraDBClustersStubs';

export class PSMDBService {
  showXtraDBCluster() {
    return mongoDBClusterConnectionStub;
  }

  getDBCluster() {
    return { connection_credentials: mongoDBClusterConnectionStub };
  }
}
