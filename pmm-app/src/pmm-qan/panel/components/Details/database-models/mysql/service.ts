import { apiRequestActions } from 'shared/components/helpers/api';

export default {
  getMySQLActions(body) {
    return apiRequestActions.post<any, any>(':startServiceAction', body);
  }
};
