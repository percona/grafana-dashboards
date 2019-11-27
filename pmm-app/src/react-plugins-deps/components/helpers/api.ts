import axios, { AxiosInstance } from 'axios';
// import get from 'lodash/get';
import { showErrorNotification } from './notification-manager';

// eslint-disable-next-line no-undef
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
export const AUTHORIZATION = 'Authorization';

class ApiRequest {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '',
    });
    // this.axiosInstance.defaults.headers.common[AUTHORIZATION] = `Bearer ${localStorage.getItem(JWT_TOKEN)}`;
  }

  async get<T, B>(path: string, query?: { params: B; cancelToken?: any }): Promise<void | T> {
    return this.axiosInstance
      .get<T>(path, query)
      .then((response): T => response.data)
      .catch((e): void => {
        if (axios.isCancel(e)) {
          throw e;
        } else {
          // eslint-disable-next-line no-console
          console.error(e);
          // Notify.error(e.message);
        }
      });
  }

  async post<T, B>(path: string, body: B): Promise<void | T> {
    return this.axiosInstance
      .post<T>(path, body)
      .then((response): T => response.data)
      .catch((e): void => {
        // eslint-disable-next-line no-console
        console.error(e.response);
        // const errorText = get(e, 'response.data.message', e.message);
        showErrorNotification({ message: e.response.data.message });
        // Notify.error(errorText);
        throw e;
      });
  }

  async delete<T>(path: string): Promise<void | T> {
    return this.axiosInstance
      .delete<T>(path)
      .then((response): T => response.data)
      .catch((e): void => {
        // eslint-disable-next-line no-console
        console.error(e);
        // Notify.error(e.message);
      });
  }

  async patch<T, B>(path: string, body: B): Promise<void | T> {
    return this.axiosInstance
      .patch<T>(path, body)
      .then((response): T => response.data)
      .catch((e): void => {
        // eslint-disable-next-line no-console
        console.error(e);
        // Notify.error(e.message);
      });
  }
}

export const apiRequest = new ApiRequest();
