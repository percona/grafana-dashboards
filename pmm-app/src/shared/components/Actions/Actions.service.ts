import { apiRequest } from '../helpers/api';
import { ActionRequest, ActionResponse } from './Actions.types';

export const ActionsService = {
  getActionResult(body: ActionRequest): Promise<ActionResponse> {
    return apiRequest.get<any, any>(`/v1/actions/${body.action_id}`);
  },
};
