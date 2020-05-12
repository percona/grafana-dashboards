import { apiRequestManagement } from '../../../../../../../react-plugins-deps/helpers/api';
import { GenericDatabase } from '../generic-database/generic-database';

export class MongoDBService extends GenericDatabase {
  static getTraditionalExplainJSONMongo({ pmm_agent_id, service_id, query }) {
    const body = {
      pmm_agent_id,
      service_id,
      query,
    };
    return apiRequestManagement.post<any, any>('/Actions/StartMongoDBExplain', body);
  }
}
