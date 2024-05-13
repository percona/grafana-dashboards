import { apiRequestActions } from 'shared/components/helpers/api';

export default {
  getTraditionalExplainJSONMongo(body) {
    return apiRequestActions.post<any, any>(':startServiceAction', body);
  },
};
