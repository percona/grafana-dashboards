import { apiRequest } from 'shared/components/helpers/api';

export default {
  getTraditionalExplainJSONMongo(body, disableNotifications = false) {
    const requestBody = { mongodb_explain: body };

    return apiRequest.post<any, any>('/v1/actions:startServiceAction', requestBody, disableNotifications);
  },
};
