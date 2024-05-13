import { apiRequestActions } from 'shared/components/helpers/api';

export default {
  getPostgreSQLActions(body) {
    return apiRequestActions.post<any, any>(':startServiceAction', body);
  },
};
