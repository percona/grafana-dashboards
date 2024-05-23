import { apiRequestActions } from 'shared/components/helpers/api';

export default {
  getTraditionalExplainJSONMongo(body) {
    const requestBody = { mongodb_explain: body };

    return apiRequestActions.post<any, any>(':startServiceAction', requestBody);
  },
};
