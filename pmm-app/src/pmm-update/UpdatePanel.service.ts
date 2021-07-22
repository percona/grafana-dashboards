import { apiRequest } from 'shared/components/helpers/api';
import {
  GetUpdatesBody,
  GetUpdateStatusBody,
  GetUpdatesResponse,
  GetUpdateStatusResponse,
  StartUpdateResponse,
} from 'pmm-update/types';

export const getCurrentVersion = (body: GetUpdatesBody = { force: false }) => apiRequest.post<GetUpdatesResponse, GetUpdatesBody>('/v1/Updates/Check', body, true);
export const startUpdate = () => apiRequest.post<StartUpdateResponse, {}>('/v1/Updates/Start', {});
export const getUpdateStatus = (body: GetUpdateStatusBody) => apiRequest.post<GetUpdateStatusResponse, GetUpdateStatusBody>('/v1/Updates/Status', body);
