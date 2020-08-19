import { apiRequest } from 'shared/components/helpers/api';
import { Credentials } from './types';

export const PlatformLoginService = {
  async signUp(credentials: Credentials) {
    let response: any = {};

    try {
      response = await apiRequest.post<any, any>('/v1/Platform/SignUp', credentials);
    } catch (e) {
      console.error(e);
    }

    return response;
  },
  async signIn(credentials: Credentials) {
    let response: any = {};

    try {
      response = await apiRequest.post<any, any>('/v1/Platform/SignIn', credentials);
    } catch (e) {
      console.error(e);
    }

    return response;
  },
};
