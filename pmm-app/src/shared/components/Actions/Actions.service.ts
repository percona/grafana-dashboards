import { apiRequestManagement } from '../helpers/api';
import { ActionRequest, ActionResponse } from './Actions.types';

export const ActionsService = {
  getActionResult(body: ActionRequest): Promise<ActionResponse> {
    return apiRequestManagement.get<any, any>(`/v1/actions/${body.action_id}`);
  },
};
