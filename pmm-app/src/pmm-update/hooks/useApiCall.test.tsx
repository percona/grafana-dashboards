import React, { FC } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { useApiCall } from './useApiCall';

jest.mock('shared/components/helpers/notification-manager');

const HookWrapper: FC<{ hook: () => any }> = ({ hook }) => {
  const dataHook = hook ? hook() : undefined;

  return <div data-hook={dataHook} />;
};

describe('useApiCall', () => {
  const fakeData = 42;
  const fakeApi = jest.fn().mockImplementation(() => fakeData);
  const fakeApiInvalid = jest.fn().mockImplementation(() => null);
  const fakeApiWithTimeout = jest.fn().mockImplementation(async () => {
    await new Promise(() => setTimeout(() => {}, 1000));

    return Promise.resolve(fakeData);
  });

  it('should return the correct values if the api call is pending', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useApiCall(fakeApiWithTimeout)} />);
    });

    wrapper?.update();

    const [data, errorMessage, isLoading, apiCall] = wrapper?.find('div').prop('data-hook');

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

    const [data, errorMessage, isLoading, apiCall] = wrapper?.find('div').prop('data-hook');

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
      wrapper = mount(<HookWrapper hook={() => useApiCall(fakeApiInvalid)} />);
    });

    wrapper?.update();

    const [data, errorMessage, isLoading, apiCall] = wrapper?.find('div').prop('data-hook');

    expect(data).toBe(undefined);
    expect(errorMessage).toEqual(Error('Invalid response received'));
    expect(isLoading).toEqual(false);

    await act(async () => {
      apiCall();
    });

    expect(fakeApiInvalid).toBeCalledTimes(2);

    wrapper?.unmount();
  });
});
