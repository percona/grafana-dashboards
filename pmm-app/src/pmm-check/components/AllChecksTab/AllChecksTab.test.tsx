import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AllChecksTab } from './AllChecksTab';
import { CheckService } from 'pmm-check/Check.service';

jest.mock('shared/components/helpers/notification-manager');

jest.mock('../../Check.service');

const originalConsoleError = jest.fn();

const dataQa = (label: string) => `[data-qa="${label}"]`;

const ROOT_SELECTOR = dataQa('db-checks-all-checks-wrapper');

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

    let root: ReactWrapper<{}, typeof AllChecksTab> = wrapper.find(ROOT_SELECTOR) as ReactWrapper<{}, typeof AllChecksTab>;

    expect(root.find(dataQa('db-checks-all-checks-spinner'))).toHaveLength(1);

    await runAllPromises();

    wrapper.update();
    root = wrapper.find(ROOT_SELECTOR);

    expect(root.find(dataQa('db-checks-all-checks-spinner'))).toHaveLength(0);

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
      { name: 'test enabled', disabled: false },
      { name: 'test disabled', disabled: true },
    ]));

    const wrapper: ReactWrapper<{}, {}, any> = mount(<AllChecksTab />);

    let root: ReactWrapper<{}, typeof AllChecksTab> = wrapper.find(ROOT_SELECTOR) as ReactWrapper<{}, typeof AllChecksTab>;

    expect(root.find(dataQa('db-checks-all-checks-spinner'))).toHaveLength(1);

    await runAllPromises();

    wrapper.update();
    root = wrapper.find(ROOT_SELECTOR);

    const tbody = dataQa('db-checks-all-checks-tbody');

    expect(root.find(dataQa('db-checks-all-checks-table'))).toHaveLength(1);
    expect(root.find(dataQa('db-checks-all-checks-thead'))).toHaveLength(1);
    expect(root.find(tbody)).toHaveLength(1);
    expect(root.find(tbody).find('tr > td')).toHaveLength(2);
    expect(root.find(tbody).find('tr > td').at(0).text()).toBe('test enabled');
    expect(root.find(tbody).find('tr > td').at(1).text()).toBe('test disabled');

    wrapper.unmount();
  });
});
