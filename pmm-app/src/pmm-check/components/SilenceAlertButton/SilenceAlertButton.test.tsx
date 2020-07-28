import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import { activeCheckStub } from 'pmm-check/__mocks__/stubs';
import { ButtonWithSpinner, SilenceAlertButton } from 'pmm-check/components';
import { AlertsReloadContext } from 'pmm-check/Check.context';
import { CheckService } from 'pmm-check/Check.service';
import { makeSilencePayload } from './SilenceAlertButton.utils';

jest.mock('shared/components/helpers/notification-manager');

jest.mock('../../Check.service');

jest.mock('./SilenceAlertButton.utils', () => ({
  makeSilencePayload: jest.fn(() => 'testPayload'),
}));
const mockedMakeSilencePayload = makeSilencePayload as jest.Mock;

describe('SilenceAlertButton::', () => {
  afterEach(() => {
    mockedMakeSilencePayload.mockClear();
  });

  it('should contain a ButtonWithSpinner', () => {
    const { labels } = activeCheckStub[0].details[0];

    const root = shallow(<SilenceAlertButton labels={labels} />);

    expect(root.find(ButtonWithSpinner).length).toEqual(1);
  });

  it('should call functions to buind the payload and to call the API to silence an alert on click', async () => {
    const { labels } = activeCheckStub[0].details[0];

    window.grafanaBootData = {
      user: {
        name: 'test_user'
      }
    };

    const fakeFetchAlerts = jest.fn();

    const spy = jest.spyOn(CheckService, 'silenceAlert');

    const root = mount(
      <AlertsReloadContext.Provider value={{ fetchAlerts: fakeFetchAlerts }}>
        <SilenceAlertButton labels={labels} />
      </AlertsReloadContext.Provider>
    );

    const wrapper = root.find(SilenceAlertButton);

    expect(mockedMakeSilencePayload).toBeCalledTimes(0);
    expect(spy).toBeCalledTimes(0);
    expect(fakeFetchAlerts).toBeCalledTimes(0);

    await act(async () => {
      wrapper.find(ButtonWithSpinner).simulate('click');
    });
    wrapper.update();

    expect(mockedMakeSilencePayload).toBeCalledTimes(1);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('testPayload');
    expect(fakeFetchAlerts).toBeCalledTimes(1);

    spy.mockClear();

    root.unmount();
  });

  it('should call functions to buind the payload and to call the API to silence an alert on click', async () => {
    const { labels } = activeCheckStub[0].details[0];

    window.grafanaBootData = {
      user: {
        name: 'test_user'
      }
    };

    const originalConsoleError = console.error;

    console.error = jest.fn();

    const spy = jest.spyOn(CheckService, 'silenceAlert');

    spy.mockImplementation(() => {
      throw Error('Test error');
    });

    const root = shallow(<SilenceAlertButton labels={labels} />);

    await act(async () => {
      root.simulate('click');
    });

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith(Error('Test error'));

    spy.mockClear();

    console.error = originalConsoleError;

    root.unmount();
  });
});
