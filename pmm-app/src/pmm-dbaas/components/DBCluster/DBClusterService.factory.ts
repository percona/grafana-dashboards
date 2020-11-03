import { Databases } from 'shared/core';
import { DBClusterService } from './DBCluster.service';
import { XtraDBService } from './XtraDB.service';
import { PSMDBService } from './PSMDB.service';

const SERVICE_MAP = {
  [Databases.mysql]: new XtraDBService(),
  [Databases.mongodb]: new PSMDBService(),
};

export class DBClusterServiceFactory {
  static newDBClusterService(type: Databases): DBClusterService {
    const service = SERVICE_MAP[type];

    return service || SERVICE_MAP[Databases.mysql];
  }
}
