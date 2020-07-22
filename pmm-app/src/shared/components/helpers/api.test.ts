import { ApiRequest } from './api';
import * as NotificationManager from './notification-manager';

// Notice how `create` was not being mocked here...
const mockNoop = jest.fn();

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    default: mockNoop,
    get: mockNoop,
    post: mockNoop,
    put: mockNoop,
    delete: mockNoop,
    patch: mockNoop,
  })),
  isCancel: jest.fn()
}));

jest.mock('shared/components/helpers/notification-manager');


describe('GET::', () => {
  it('should return data', async () => {
    const apiRequest = new ApiRequest({});

    apiRequest.axiosInstance.get.mockResolvedValueOnce({ data: 'some data' });
    const result = await apiRequest.get('/test/path', { params: { key: 'value' } });

    expect(result).toEqual('some data');
  });
});

describe('POST::', () => {
  const { showErrorNotification } = NotificationManager as jest.Mocked<typeof NotificationManager>;

  it('should return response data', async () => {
    const apiRequest = new ApiRequest({});

    apiRequest.axiosInstance.post.mockResolvedValueOnce({ data: 'some data' });
    const result = await apiRequest.post('/test/path', { key: 'value' });

    expect(result).toEqual('some data');
    expect(showErrorNotification).toBeCalledTimes(0);
  });

  it('should display an error message on a network error', async () => {
    showErrorNotification.mockClear();
    const response = { response: { data: { message: 'Error' } } };
    const apiRequest = new ApiRequest({});

    apiRequest.axiosInstance.post.mockImplementationOnce(() => Promise.reject(response));
    const result = apiRequest.post('/test/path', { key: 'value' });

    await expect(result).rejects.toEqual(response);
    expect(showErrorNotification).toBeCalledTimes(1);
  });

  it('should display no error message if messages are disabled', async () => {
    showErrorNotification.mockClear();
    const apiRequest = new ApiRequest({});
    const response = { message: 'Error' };

    apiRequest.axiosInstance.post.mockImplementationOnce(() => Promise.reject(response));
    const result = apiRequest.post('/test/path', { key: 'value' }, true);

    await expect(result).rejects.toEqual(response);
    expect(showErrorNotification).toBeCalledTimes(0);
  });
});

describe('PATCH::', () => {
  it('should return response data', async () => {
    const apiRequest = new ApiRequest({});

    apiRequest.axiosInstance.patch.mockResolvedValueOnce({ data: 'some data' });
    const result = await apiRequest.patch('/test/path', { key: 'value' });

    await expect(result).toEqual('some data');
  });
});

describe('DELETE::', () => {
  it('should return response data', async () => {
    const apiRequest = new ApiRequest({});

    apiRequest.axiosInstance.delete.mockResolvedValueOnce({ data: 'some data' });
    const result = await apiRequest.delete('/test/path');

    await expect(result).toEqual('some data');
  });
});
