import React, { FC } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { useApiCall } from './useApiCall';

jest.mock('../../react-plugins-deps/components/helpers/notification-manager');

const HookWrapper: FC<{ hook: () => any }> = ({ hook }) => {
  const dataHook = hook ? hook() : undefined;
  return <div data-hook={dataHook} />;
};

describe('useApiCall', () => {
  const fakeData = 42;
  const fakeApi = jest.fn().mockImplementation(() => Promise.resolve(fakeData));

  it('should return the correct values if the api call is successfull', async () => {
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
  });
});
