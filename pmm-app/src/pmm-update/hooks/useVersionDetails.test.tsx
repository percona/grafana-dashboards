import React, { FC } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { useApiCall, useVersionDetails } from 'pmm-update/hooks';

jest.mock('shared/components/helpers/notification-manager');

const HookWrapper: FC<{ hook: () => any }> = ({ hook }) => {
  const dataHook = hook ? hook() : undefined;

  return <div data-hook={dataHook} />;
};

// NOTE (nicolalamacchia): this mock is here because some test cases alter it
jest.mock('./useApiCall', () => ({
  useApiCall: jest.fn(),
}));
const mockedUseApiCall = useApiCall as jest.Mock;

const fakeData = {
  last_check: '2020-06-10T19:16:57Z',
  latest: {
    full_version: 'x.y.z-rc.j+1234567890',
    timestamp: '2020-06-09T19:16:57Z',
    version: 'x.y.z',
  },
  installed: {
    full_version: 'a.b.c-rc.i+0123456789',
    timestamp: '2020-06-08T19:16:57Z',
    version: 'a.b.c',
  },
  latest_news_url: 'https://percona.com',
  update_available: true,
};

const fakeDataUndefinedLeafs = {
  last_check: undefined,
  latest: {
    full_version: undefined,
    timestamp: undefined,
    version: undefined,
  },
  installed: {
    full_version: undefined,
    timestamp: undefined,
    version: undefined,
  },
  latest_news_url: undefined,
  update_available: undefined,
};

const emptyNextVersionDetails = {
  nextVersion: '',
  nextFullVersion: '',
  nextVersionDate: '',
  newsLink: '',
};
const emptyInstalledVersionDetails = {
  installedVersion: '',
  installedFullVersion: '',
  installedVersionDate: '',
};

const mockedApiCall = jest.fn();

const defaultMockedUseApiCallReturn = [undefined, '', true, mockedApiCall];

describe('useVersionDetails', () => {
  let wrapper: ReturnType<typeof mount> | undefined;

  beforeEach(async () => {
    // default mock
    mockedUseApiCall.mockImplementation(() => defaultMockedUseApiCallReturn);

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useVersionDetails()} />);
    });
    wrapper?.update();
  });

  afterEach(() => {
    mockedUseApiCall.mockRestore();
    wrapper?.unmount();
    mockedApiCall.mockClear();
  });

  it('should make an API call using useApiCall', () => {
    expect(mockedUseApiCall).toBeCalledTimes(1);
  });

  it('should return sane defaults when data is undefined', async () => {
    const [
      {
        installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable,
      },
      errorMessage,
      isLoading,
      isDefaultView,
      getVersionDetails,
    ] = wrapper?.find('div').prop<any>('data-hook');

    expect(installedVersionDetails).toEqual(emptyInstalledVersionDetails);
    expect(lastCheckDate).toEqual('');
    expect(nextVersionDetails).toEqual(emptyNextVersionDetails);
    expect(isUpdateAvailable).toEqual(false);
    expect(errorMessage).toBe(defaultMockedUseApiCallReturn[1]);
    expect(isLoading).toEqual(defaultMockedUseApiCallReturn[2]);
    expect(isDefaultView).toBe(true);

    await act(async () => {
      getVersionDetails();
    });
    wrapper?.update();

    expect(mockedApiCall).toBeCalledTimes(1);
  });

  it('should return the correct fallbacks when the API call returns some undefined values', async () => {
    mockedUseApiCall.mockImplementation(() => [fakeDataUndefinedLeafs, '', false, mockedApiCall]);

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useVersionDetails()} />);
    });
    wrapper?.update();

    const [
      {
        installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable,
      },
      errorMessage,
      isLoading,
      isDefaultView,
      getVersionDetails,
    ] = wrapper?.find('div').prop<any>('data-hook');

    expect(installedVersionDetails).toEqual(emptyInstalledVersionDetails);
    expect(lastCheckDate).toEqual('');
    expect(nextVersionDetails).toEqual(emptyNextVersionDetails);
    expect(isUpdateAvailable).toEqual(false);
    expect(errorMessage).toBe('');
    expect(isLoading).toEqual(false);
    expect(isDefaultView).toBe(false);

    await act(async () => {
      getVersionDetails();
    });
    wrapper?.update();

    expect(mockedApiCall).toBeCalledTimes(1);
  });

  it('should return the correct values from the API call response', async () => {
    mockedUseApiCall.mockImplementation(() => [fakeData, '', false, mockedApiCall]);

    await act(async () => {
      wrapper = mount(<HookWrapper hook={() => useVersionDetails()} />);
    });
    wrapper?.update();

    const [
      {
        installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable,
      },
      errorMessage,
      isLoading,
      isDefaultView,
      getVersionDetails,
    ] = wrapper?.find('div').prop<any>('data-hook');

    const expectedNextVersionDetails = {
      nextFullVersion: fakeData.latest.full_version,
      nextVersionDate: 'June 09, 2020',
      nextVersion: fakeData.latest.version,
      newsLink: 'https://percona.com',
    };
    const expectedInstalledVersionDetails = {
      installedFullVersion: fakeData.installed.full_version,
      installedVersionDate: 'June 08, 2020',
      installedVersion: fakeData.installed.version,
    };

    expect(installedVersionDetails).toEqual(expectedInstalledVersionDetails);
    expect(lastCheckDate).toEqual('June 10, 19:16');
    expect(nextVersionDetails).toEqual(expectedNextVersionDetails);
    expect(isUpdateAvailable).toEqual(fakeData.update_available);
    expect(errorMessage).toBe('');
    expect(isLoading).toEqual(false);
    expect(isDefaultView).toBe(false);

    await act(async () => {
      getVersionDetails();
    });
    wrapper?.update();

    expect(mockedApiCall).toBeCalledTimes(1);
  });
});
