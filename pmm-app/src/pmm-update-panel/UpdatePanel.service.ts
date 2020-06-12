import { apiRequest } from 'react-plugins-deps/components/helpers/api';

interface GetUpdatesBody {
  force: boolean;
}

interface GetUpdateStatusBody {
  auth_token: string;
  log_offset: number;
}

export const getUpdates = () => apiRequest.post<any, GetUpdatesBody>('/v1/Updates/Check', { force: true });
export const getCurrentVersion = () =>
  apiRequest.post<any, GetUpdatesBody>('/v1/Updates/Check', { force: false });
export const startUpdate = () => apiRequest.post<any, {}>('/v1/Updates/Start', {});
export const getUpdateStatus = (body: GetUpdateStatusBody) =>
  apiRequest.post<any, GetUpdateStatusBody>('/v1/Updates/Status', body);
