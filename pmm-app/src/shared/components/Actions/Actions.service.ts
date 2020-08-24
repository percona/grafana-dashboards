import { apiRequestManagement } from '../helpers/api';

export const ActionsService = {
  getActionResult(body) {
    return apiRequestManagement.post<any, any>('/Actions/Get', body);
  },
};
