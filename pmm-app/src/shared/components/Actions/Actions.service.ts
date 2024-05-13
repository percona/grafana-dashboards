import { apiRequestActions } from '../helpers/api';
import { ActionRequest, ActionResponse } from './Actions.types';

export const ActionsService = {
  getActionResult(body: ActionRequest): Promise<ActionResponse> {
    return apiRequestActions.get<any, any>(`/${body.action_id}`);
  },
};
