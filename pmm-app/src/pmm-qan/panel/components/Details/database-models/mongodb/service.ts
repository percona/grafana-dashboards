import { apiRequestManagement } from 'shared/components/helpers/api';

export default {
  getTraditionalExplainJSONMongo(body) {
    return apiRequestManagement.postCancelable<any, any>('/Actions/StartMongoDBExplain', body);
  },
};
