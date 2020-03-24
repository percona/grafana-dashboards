import axios, { AxiosInstance } from 'axios';
import { showErrorNotification } from './notification-manager';

// eslint-disable-next-line no-undef

class ApiRequest {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios;
    //     .create({
    //   baseURL: '',
    // });
  }

  async get<T, B>(path: string, query?: { params: B; cancelToken?: any }): Promise<void | T> {
    return this.axiosInstance
      .get<T>(path, query)
      .then((response): T => response.data)
      .catch((e): void => {
        showErrorNotification({ message: e.message });
        if (axios.isCancel(e)) {
          throw e;
        } else {
          showErrorNotification({ message: e.message });
        }
      });
  }

  async post<T, B>(path: string, body: B): Promise<void | T> {
    return this.axiosInstance
      .post<T>(path, body)
      .then((response): T => response.data)
      .catch((e): void => {
        showErrorNotification({ message: e.response.data.message });
        throw e;
      });
  }

  async delete<T>(path: string): Promise<void | T> {
    return this.axiosInstance
      .delete<T>(path)
      .then((response): T => response.data)
      .catch((e): void => {
        // Notify.error(e.message);
      });
  }

  async patch<T, B>(path: string, body: B): Promise<void | T> {
    return this.axiosInstance
      .patch<T>(path, body)
      .then((response): T => response.data)
      .catch((e): void => {
        // Notify.error(e.message);
      });
  }
}

export const apiRequest = new ApiRequest();
