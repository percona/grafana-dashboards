import { apiRequestManagement } from 'shared/components/helpers/api';

export default class MongoDBService {
  static getTraditionalExplainJSONMongo(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMongoDBExplain', body);
  }
}
