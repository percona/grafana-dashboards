import React, { FC } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { useInitializeUpdate, usePerformUpdate } from 'pmm-update/hooks';
import { getUpdateStatus } from 'pmm-update/UpdatePanel.service';

const fakeLaunchUpdate = jest.fn();

jest.mock('shared/components/helpers/notification-manager');

const HookWrapper: FC<{ hook: () => any }> = ({ hook }) => {
  const dataHook = hook ? hook() : undefined;

  return <div data-hook={dataHook} />;
};

// NOTE (nicolalamacchia): these mocks are here because some test cases alter them
jest.mock('./useInitializeUpdate', () => ({
  useInitializeUpdate: jest.fn(),
}));
const mockedUseInitializeUpdate = useInitializeUpdate as jest.Mock;

jest.mock('../UpdatePanel.service', () => ({
  getUpdateStatus: jest.fn(),
}));
const mockedGetUpdateStatus = getUpdateStatus as jest.Mock;

describe('usePerformUpdate', () => {
  beforeEach(() => {
    // default mocks
    mockedUseInitializeUpdate.mockImplementation(() => ['authToken', 0, false, fakeLaunchUpdate]);
    mockedGetUpdateStatus.mockImplementation(() => ({
      done: false,
      log_offset: 0,
      log_lines: ['test'],
    }));
  });

  afterEach(() => {
    mockedUseInitializeUpdate.mockRestore();
    mockedGetUpdateStatus.mockRestore();
  });

  it('should return the correct values if the upgrade initialization was successful', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => usePerformUpdate()} />);
    });

    wrapper?.update();

    const [output, errorMessage, isUpdated, updateFailed, launchUpdate] = wrapper
      ?.find('div')
      .prop<any>('data-hook');

    expect(output).toEqual('test\n');
    expect(errorMessage).toEqual('');
    expect(isUpdated).toEqual(false);
    expect(updateFailed).toEqual(false);

    await act(async () => {
      launchUpdate();
    });

    expect(fakeLaunchUpdate).toBeCalledTimes(1);

    wrapper?.unmount();
  });

  it('should return updateFailed equal to true if the initialization failed', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    mockedUseInitializeUpdate.mockImplementation(() => ['authToken', 0, true, fakeLaunchUpdate]);

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => usePerformUpdate()} />);
    });

    wrapper?.update();

    const [output, errorMessage, isUpdated, updateFailed] = wrapper?.find('div').prop<any>('data-hook');

    expect(output).toEqual('');
    expect(errorMessage).toEqual('');
    expect(isUpdated).toEqual(false);
    expect(updateFailed).toEqual(true);

    wrapper?.unmount();
  });

  it('should return isUpdated equal to true if the upgrade succeeded', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    (getUpdateStatus as jest.Mock).mockImplementation(() => ({
      done: true,
      log_offset: 0,
      log_lines: ['test'],
    }));

    jest.useFakeTimers();

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => usePerformUpdate()} />);
    });

    await act(async () => {
      jest.runAllTimers();
    });

    wrapper?.update();

    const [output, errorMessage, isUpdated, updateFailed] = wrapper?.find('div').prop<any>('data-hook');

    expect(output).toEqual('test\n');
    expect(errorMessage).toEqual('');
    expect(isUpdated).toEqual(true);
    expect(updateFailed).toEqual(false);

    wrapper?.unmount();

    jest.useRealTimers();
  });

  it('should return an error message if the API call response is invalid', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    (getUpdateStatus as jest.Mock).mockImplementation(() => {});

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => usePerformUpdate()} />);
    });

    wrapper?.update();

    const [output, errorMessage, isUpdated, updateFailed] = wrapper?.find('div').prop<any>('data-hook');

    expect(output).toEqual('');
    expect(errorMessage).toEqual('Invalid response received');
    expect(isUpdated).toEqual(false);
    expect(updateFailed).toEqual(false);

    wrapper?.unmount();
  });

  it('should increase logOffset value only with values received from server', async () => {
    let wrapper: ReturnType<typeof mount> | undefined;

    const mockedGetUpdateStatus = getUpdateStatus as jest.Mock;

    mockedGetUpdateStatus.mockImplementationOnce(() => ({
      done: false,
      log_offset: 1500,
      log_lines: ['test'],
    })).mockImplementationOnce(() => ({
      done: false,
      log_offset: 3000,
      log_lines: ['test'],
    })).mockImplementationOnce(() => ({
      done: false,
      log_offset: 6000,
      log_lines: ['test'],
    }));

    jest.useFakeTimers();

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => usePerformUpdate()} />);
    });

    await act(async () => {
      jest.runAllTimers();
    });
    wrapper?.update();

    await act(async () => {
      jest.runAllTimers();
    });
    wrapper?.update();

    expect(mockedGetUpdateStatus.mock.calls.length).toBe(3);

    expect(mockedGetUpdateStatus.mock.calls[0][0].log_offset).toBe(0);
    expect(mockedGetUpdateStatus.mock.calls[1][0].log_offset).toBe(1500);
    expect(mockedGetUpdateStatus.mock.calls[2][0].log_offset).toBe(3000);

    const [output, errorMessage, isUpdated, updateFailed] = wrapper?.find('div').prop<any>('data-hook');

    expect(output).toEqual('test\ntest\ntest\n');
    expect(errorMessage).toEqual('');
    expect(isUpdated).toEqual(false);
    expect(updateFailed).toEqual(false);

    wrapper?.unmount();

    jest.useRealTimers();
  });
});
