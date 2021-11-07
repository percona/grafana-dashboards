import React, { FC } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { startUpdate } from 'pmm-update/UpdatePanel.service';
import { useInitializeUpdate } from './useInitializeUpdate';

jest.mock('shared/components/helpers/notification-manager');

const HookWrapper: FC<{ hook: () => any }> = ({ hook }) => {
  const dataHook = hook ? hook() : undefined;

  return <div data-hook={dataHook} />;
};

// NOTE (nicolalamacchia): this mock is here because some test cases alter it
jest.mock('../UpdatePanel.service', () => ({
  startUpdate: jest.fn(),
}));

const mockedStartUpdate = startUpdate as jest.Mock;
const originalConsoleError = jest.fn();

describe('useInitializeUpdate', () => {
  beforeEach(() => {
    // default mock
    mockedStartUpdate.mockImplementation(() => ({
      auth_token: 'test',
      log_offset: 1337,
    }));

    console.error = jest.fn();
  });

  afterEach(() => {
    mockedStartUpdate.mockRestore();
    console.error = originalConsoleError;
  });

  it('should return the correct values if the api call is pending', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useInitializeUpdate()} />);
    });

    wrapper?.update();

    let [authToken, logOffset, updateFailed, initializeUpdate] = wrapper?.find('div').prop<any>('data-hook');

    expect(authToken).toEqual('');
    expect(logOffset).toEqual(0);
    expect(updateFailed).toEqual(false);

    await act(async () => {
      initializeUpdate();
    });

    wrapper?.update();

    [authToken, logOffset, updateFailed, initializeUpdate] = wrapper?.find('div').prop<any>('data-hook');

    expect(mockedStartUpdate).toBeCalledTimes(1);

    expect(authToken).toEqual('test');
    expect(logOffset).toEqual(1337);
    expect(updateFailed).toEqual(false);

    wrapper?.unmount();
  });

  it('should return updateFailed equal to true if the the API call response was invalid', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    mockedStartUpdate.mockImplementation(() => null);

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useInitializeUpdate()} />);
    });

    wrapper?.update();

    let [authToken, logOffset, updateFailed, initializeUpdate] = wrapper?.find('div').prop<any>('data-hook');

    await act(async () => {
      initializeUpdate();
    });

    wrapper?.update();

    [authToken, logOffset, updateFailed, initializeUpdate] = wrapper?.find('div').prop<any>('data-hook');

    expect(authToken).toEqual('');
    expect(logOffset).toEqual(0);
    expect(updateFailed).toEqual(true);

    wrapper?.unmount();
  });
});
