import React from 'react';
import { Link } from 'react-router-dom';
import { dataQa } from '@percona/platform-core';
import { ReactWrapper, mount } from 'enzyme';
import { CheckPanelRouter } from './CheckPanel';
import { CheckService } from './Check.service';
import { Messages } from './CheckPanel.messages';

jest.mock('shared/components/helpers/notification-manager');

jest.mock('./Check.service');

const originalConsoleError = console.error;

// immediately resolves all pending promises: allows to run expectations after a promise
const runAllPromises = () => new Promise(setImmediate);

describe('CheckPanel::', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    jest.resetAllMocks();
  });

  it('should fetch settings at startup', () => {
    const spy = jest.spyOn(CheckService, 'getSettings');

    const wrapper: ReactWrapper<{}, {}, any> = mount(<CheckPanelRouter />);

    expect(spy).toBeCalledTimes(1);

    spy.mockClear();
    wrapper.unmount();
  });

  it('should render a spinner at startup, while loading', async () => {
    const wrapper: ReactWrapper<{}, {}, any> = mount(<CheckPanelRouter />);

    expect(wrapper.find(dataQa('db-check-spinner'))).toHaveLength(1);

    await runAllPromises();
    wrapper.update();

    expect(wrapper.find(dataQa('db-check-spinner'))).toHaveLength(0);

    wrapper.unmount();
  });

  it('should log an error if the API call fails', () => {
    const spy = jest.spyOn(CheckService, 'getSettings').mockImplementation(() => { throw Error('test'); });

    const wrapper: ReactWrapper<{}, {}, any> = mount(<CheckPanelRouter />);

    expect(console.error).toBeCalledTimes(1);

    spy.mockClear();
    wrapper.unmount();
  });

  it('should render the link to Settings when STT is disabled', async () => {
    const spy = jest.spyOn(CheckService, 'getSettings').mockImplementation(() => Promise.resolve({
      settings: {
        stt_enabled: false,
      },
    }));

    const wrapper: ReactWrapper<{}, {}, any> = mount(<CheckPanelRouter />);

    await runAllPromises();
    wrapper.update();

    expect(wrapper.find(dataQa('db-check-panel-settings-link'))).toHaveLength(1);
    const text = `${Messages.sttDisabled} ${Messages.pmmSettings}`;

    expect(wrapper.find(dataQa('db-check-panel-settings-link')).text()).toEqual(text);

    expect(wrapper.find(Link).length).toEqual(1);

    spy.mockClear();
    wrapper.unmount();
  });

  it('should show a message to unauthorized users', async () => {
    const UnauthorizedError = () => ({
      response: {
        status: 401,
      },
    });

    const spy = jest.spyOn(CheckService, 'getSettings').mockImplementation(() => {
      throw UnauthorizedError();
    });

    const wrapper: ReactWrapper<{}, {}, any> = mount(<CheckPanelRouter />);

    await runAllPromises();
    wrapper.update();

    expect(wrapper.find(dataQa('db-check-panel-unauthorized'))).toHaveLength(1);
    expect(wrapper.find(dataQa('db-check-panel-unauthorized')).text()).toEqual(Messages.unauthorized);

    spy.mockClear();
    wrapper.unmount();
  });
});
