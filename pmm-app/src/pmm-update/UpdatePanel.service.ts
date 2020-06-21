import { apiRequest } from 'react-plugins-deps/components/helpers/api';
import {
  GetUpdatesBody,
  GetUpdateStatusBody,
  GetUpdatesResponse,
  GetUpdateStatusResponse,
  StartUpdateResponse,
} from 'pmm-update/types';

export const getUpdates = () =>
  apiRequest.post<GetUpdatesResponse, GetUpdatesBody>('/v1/Updates/Check', { force: true });
export const getCurrentVersion = () =>
  apiRequest.post<GetUpdatesResponse, GetUpdatesBody>('/v1/Updates/Check', { force: false });
export const startUpdate = () => apiRequest.post<StartUpdateResponse, {}>('/v1/Updates/Start', {});
export const getUpdateStatus = (body: GetUpdateStatusBody) =>
  apiRequest.post<GetUpdateStatusResponse, GetUpdateStatusBody>('/v1/Updates/Status', body);
