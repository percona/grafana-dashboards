import { apiRequest } from './api';
import axios from 'axios';
jest.mock('axios'); //Add this on top of your test file.
jest.mock('../../../react-plugins-deps/components/helpers/notification-manager', () => () => ({}));

describe('GET tests', () => {
  it('should return data', async function() {
    axios.get.mockResolvedValue({ data: 'some data' });
    const result = await apiRequest.get('/test/path', { params: { key: 'value' } });
    await expect(result).toEqual('some data');
  });
});

describe('POST tests', () => {
  it('should return data', async function() {
    axios.post.mockResolvedValue({ data: 'some data' });
    const result = await apiRequest.post('/test/path', { key: 'value' });
    await expect(result).toEqual('some data');
  });
});

describe('PATCH tests', () => {
  it('should return data', async function() {
    axios.patch.mockResolvedValue({ data: 'some data' });
    const result = await apiRequest.patch('/test/path', { key: 'value' });
    await expect(result).toEqual('some data');
  });
});

describe('DELETE tests', () => {
  it('should return data', async function() {
    axios.delete.mockResolvedValue({ data: 'some data' });
    const result = await apiRequest.delete('/test/path');
    await expect(result).toEqual('some data');
  });
});
