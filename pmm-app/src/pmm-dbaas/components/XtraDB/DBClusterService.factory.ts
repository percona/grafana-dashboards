import { Databases } from 'shared/core';
import { DBClusterService } from './DBCluster.service';
import { XtraDBService } from './XtraDB.service';
import { PSMDBService } from './PSMDB.service';

export class DBClusterServiceFactory {
  static newDBClusterService(type: Databases): DBClusterService {
    switch (type) {
      case Databases.mysql:
        return new XtraDBService();
      case Databases.mongodb:
        return new PSMDBService();
      default:
        return new XtraDBService();
    }
  }
}
