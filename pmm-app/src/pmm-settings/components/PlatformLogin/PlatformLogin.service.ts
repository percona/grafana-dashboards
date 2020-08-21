import { apiRequest } from 'shared/components/helpers/api';
import { Credentials } from './types';

export const PlatformLoginService = {
  signUp(credentials: Credentials): Promise<void> {
    return apiRequest.post<void, Credentials>('/v1/Platform/SignUp', credentials);
  },
  signIn(credentials: Credentials): Promise<void> {
    return apiRequest.post<void, Credentials>('/v1/Platform/SignIn', credentials);
  },
  signOut(): Promise<void> {
    return apiRequest.post<void, {}>('/v1/Platform/SignOut', {});
  },
};
