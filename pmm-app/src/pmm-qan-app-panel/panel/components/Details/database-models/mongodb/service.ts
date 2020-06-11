import { apiRequestManagement } from 'shared/components/helpers/api';

export default {
  getTraditionalExplainJSONMongo(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartMongoDBExplain', body);
  },
};
