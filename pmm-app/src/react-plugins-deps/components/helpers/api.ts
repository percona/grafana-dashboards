import axios from 'axios';
import { showErrorNotification } from './notification-manager';

// eslint-disable-next-line no-undef

class ApiRequest {
  axiosInstance: any;
  constructor(params) {
    this.axiosInstance = axios.create({
      ...params,
    });
  }

  async post<T, B>(path: string, body: {}): Promise<void | T> {
    // @ts-ignore
    return this.axiosInstance
      .post<T>(path, body)
      .then((response): T => response.data)
      .catch((e): void => {
        showErrorNotification({ message: e.response.data.message });
        throw e;
      });
  }
}

export const apiRequestQAN = new ApiRequest({ baseURL: '/v0/qan' });
export const apiRequestManagement = new ApiRequest({ baseURL: '/v1/management' });
