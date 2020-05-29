import axiosInstance from 'axios';
import { apiRequest } from './api';
import * as NotificationManager from './notification-manager';

jest.mock('axios');
jest.mock('../../../react-plugins-deps/components/helpers/notification-manager');

const axios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('GET::', () => {
  it('should return data', async () => {
    axios.get.mockResolvedValueOnce({ data: 'some data' });
    const result = await apiRequest.get('/test/path', { params: { key: 'value' } });

    expect(result).toEqual('some data');
  });
});

describe('POST::', () => {
  const { showErrorNotification } = NotificationManager as jest.Mocked<typeof NotificationManager>;

  it('should return response data', async () => {
    axios.post.mockResolvedValueOnce({ data: 'some data' });
    const result = await apiRequest.post('/test/path', { key: 'value' });

    expect(result).toEqual('some data');
    expect(showErrorNotification).toBeCalledTimes(0);
  });

  it('should display an error message on a network error', async () => {
    showErrorNotification.mockClear();
    axios.post.mockImplementationOnce(() => Promise.reject(response));
    const response = { response: { data: { message: 'Error' } } };
    const result = apiRequest.post('/test/path', { key: 'value' });

    await expect(result).rejects.toEqual(response);
    expect(showErrorNotification).toBeCalledTimes(1);
  });

  it('should display no error message if messages are disabled', async () => {
    showErrorNotification.mockClear();
    axios.post.mockImplementationOnce(() => Promise.reject(response));
    const response = { message: 'Error' };
    const result = apiRequest.post('/test/path', { key: 'value' }, true);

    await expect(result).rejects.toEqual(response);
    expect(showErrorNotification).toBeCalledTimes(0);
  });
});

describe('PATCH::', () => {
  it('should return response data', async () => {
    axios.patch.mockResolvedValueOnce({ data: 'some data' });

    const result = await apiRequest.patch('/test/path', { key: 'value' });
    await expect(result).toEqual('some data');
  });
});

describe('DELETE::', () => {
  it('should return response data', async () => {
    axios.delete.mockResolvedValueOnce({ data: 'some data' });

    const result = await apiRequest.delete('/test/path');
    await expect(result).toEqual('some data');
  });
});
