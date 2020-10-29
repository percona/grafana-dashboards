import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { CheckService } from 'pmm-check/Check.service';
import { AllChecksTab } from './AllChecksTab';

jest.mock('shared/components/helpers/notification-manager');

const originalConsoleError = jest.fn();

const dataQa = (label: string) => `[data-qa="${label}"]`;

const runAllPromises = () => new Promise(setImmediate);

describe('AllChecksTab::', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    jest.resetAllMocks();
  });

  it('should fetch checks at startup', () => {
    const spy = jest.spyOn(CheckService, 'getAllChecks');

    const wrapper: ReactWrapper<{}, {}, any> = mount(<AllChecksTab />);

    expect(spy).toBeCalledTimes(1);

    spy.mockClear();
    wrapper.unmount();
  });

  it('should render a spinner at startup, while loading', async () => {
    const wrapper: ReactWrapper<{}, {}, any> = mount(<AllChecksTab />);

    await runAllPromises();

    wrapper.update();

    expect(wrapper.find(dataQa('db-checks-all-checks-spinner'))).toHaveLength(0);

    wrapper.unmount();
  });

  it('should log an error if the API call fails', () => {
    const spy = jest.spyOn(CheckService, 'getAllChecks').mockImplementation(() => { throw Error('test'); });

    const wrapper: ReactWrapper<{}, {}, any> = mount(<AllChecksTab />);

    expect(console.error).toBeCalledTimes(1);

    spy.mockClear();
    wrapper.unmount();
  });

  it('should render a table', async () => {
    jest.spyOn(CheckService, 'getAllChecks').mockImplementation(() => Promise.resolve([
      { name: 'test enabled', description: 'test enabled description', disabled: false },
      { name: 'test disabled', description: 'test disabled description', disabled: true },
    ]));

    const wrapper: ReactWrapper<{}, {}, any> = mount(<AllChecksTab />);

    await runAllPromises();

    wrapper.update();

    const tbody = dataQa('db-checks-all-checks-tbody');

    expect(wrapper.find(dataQa('db-checks-all-checks-table'))).toHaveLength(1);
    expect(wrapper.find(dataQa('db-checks-all-checks-thead'))).toHaveLength(1);
    expect(wrapper.find(tbody)).toHaveLength(1);
    expect(wrapper.find(tbody).find('tr > td')).toHaveLength(4);
    expect(wrapper.find(tbody).find('tr > td').at(0).text()).toBe('test enabled');
    expect(wrapper.find(tbody).find('tr > td').at(1).text()).toBe('test enabled description');
    expect(wrapper.find(tbody).find('tr > td').at(2).text()).toBe('test disabled');
    expect(wrapper.find(tbody).find('tr > td').at(3).text()).toBe('test disabled description');

    wrapper.unmount();
  });
});
