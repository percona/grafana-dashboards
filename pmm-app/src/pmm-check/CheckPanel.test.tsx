import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { CheckPanelRouter } from './CheckPanel';
import { CheckService } from './Check.service';

jest.mock('shared/components/helpers/notification-manager');

jest.mock('./Check.service');

const originalConsoleError = jest.fn();

const dataQa = (label: string) => `[data-qa="${label}"]`;

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

    await runAllPromises();

    wrapper.update();

    expect(wrapper.find(dataQa('db-checks-all-checks-spinner'))).toHaveLength(0);

    wrapper.unmount();
  });

  it('should log an error if the API call fails', () => {
    const spy = jest.spyOn(CheckService, 'getSettings').mockImplementation(() => { throw Error('test'); });

    const wrapper: ReactWrapper<{}, {}, any> = mount(<CheckPanelRouter />);

    expect(console.error).toBeCalledTimes(1);

    spy.mockClear();
    wrapper.unmount();
  });
});
