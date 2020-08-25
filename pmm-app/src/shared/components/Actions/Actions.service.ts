import { apiRequestManagement } from '../helpers/api';
import { ActionRequest, ActionResponse } from './Actions.types';

export const ActionsService = {
  getActionResult(body: ActionRequest): Promise<ActionResponse> {
    return apiRequestManagement.post<any, any>('/Actions/Get', body);
  },
};
