import React, { FC } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { useApiCall } from './useApiCall';

jest.mock('shared/components/helpers/notification-manager');
const originalConsoleError = console.error;

const HookWrapper: FC<{ hook: () => any }> = ({ hook }) => {
  const dataHook = hook ? hook() : undefined;

  return <div data-hook={dataHook} />;
};

describe('useApiCall::', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  const fakeData = 42;
  const fakeApi = jest.fn().mockImplementation(() => Promise.resolve(fakeData));
  const fakeApiInvalid = jest.fn().mockImplementation(() => Promise.resolve(null));
  const fakeApiWithTimeout = jest.fn().mockImplementation(async () => {
    await new Promise(() => setTimeout(() => {}, 1000));

    return Promise.resolve(fakeData);
  });
  const fakeApiRetry = jest.fn().mockImplementation(async (value: number) => {
    if (value !== fakeData) {
      return Promise.reject();
    }

    return Promise.resolve(fakeData);
  });

  it('should return the correct values if the api call is pending', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useApiCall(fakeApiWithTimeout)} />);
    });

    wrapper?.update();

    const [data, errorMessage, isLoading, apiCall] = wrapper?.find('div').prop<any>('data-hook');

    expect(data).toEqual(undefined);
    expect(errorMessage).toEqual('');
    expect(isLoading).toEqual(true);

    await act(async () => {
      apiCall();
    });

    expect(fakeApiWithTimeout).toBeCalledTimes(2);

    wrapper?.unmount();
  });

  it('should return the correct values if the api call has succeeded', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useApiCall(fakeApi)} />);
    });

    wrapper?.update();

    const [data, errorMessage, isLoading, apiCall] = wrapper?.find('div').prop<any>('data-hook');

    expect(data).toEqual(fakeData);
    expect(errorMessage).toEqual('');
    expect(isLoading).toEqual(false);

    await act(async () => {
      apiCall();
    });

    expect(fakeApi).toBeCalledTimes(2);

    wrapper?.unmount();
  });

  it('should return the correct error if the api call has failed', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useApiCall(fakeApiInvalid, {}, {}, false)} />);
    });

    wrapper?.update();

    const [data, errorMessage, isLoading, apiCall] = wrapper?.find('div').prop<any>('data-hook');

    expect(data).toBe(undefined);
    expect(errorMessage).toEqual(Error('Invalid response received'));
    expect(isLoading).toEqual(false);

    await act(async () => {
      apiCall();
    });

    expect(fakeApiInvalid).toBeCalledTimes(2);

    wrapper?.unmount();
  });

  it('should retry the call with different arguments if retry is true', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useApiCall(fakeApiRetry, null, fakeData)} />);
    });

    wrapper?.update();

    const [data, errorMessage, isLoading] = wrapper?.find('div').prop<any>('data-hook');

    expect(data).toBe(fakeData);
    expect(errorMessage).toEqual('');
    expect(isLoading).toEqual(false);

    // called 2 times due to retry being enabled
    expect(fakeApiRetry).toBeCalledTimes(2);

    wrapper?.unmount();
  });
});
