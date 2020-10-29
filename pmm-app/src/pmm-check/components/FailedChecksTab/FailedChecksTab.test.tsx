import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { CheckService } from 'pmm-check/Check.service';
import { ButtonWithSpinner } from 'shared/components/Form';
import { Table } from 'pmm-check/components';
import { FailedChecksTabProps } from './types';
import { FailedChecksTab } from './FailedChecksTab';

jest.mock('shared/components/helpers/notification-manager');

const originalConsoleError = jest.fn();

const dataQa = (label: string) => `[data-qa="${label}"]`;

const runAllPromises = () => new Promise(setImmediate);

describe('FailedChecksTab::', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    jest.resetAllMocks();
  });

  it('should fetch active alerts at startup', () => {
    const spy = jest.spyOn(CheckService, 'getActiveAlerts');

    const wrapper: ReactWrapper<FailedChecksTabProps, {}, any> = mount(
      <FailedChecksTab hasNoAccess={false} isSttEnabled />,
    );

    expect(spy).toBeCalledTimes(1);

    spy.mockClear();
    wrapper.unmount();
  });

  it('should render a spinner at startup, while loading', async () => {
    const wrapper: ReactWrapper<FailedChecksTabProps, {}, any> = mount(
      <FailedChecksTab hasNoAccess={false} isSttEnabled />,
    );

    expect(wrapper.find(dataQa('db-checks-failed-checks-spinner'))).toHaveLength(1);

    await runAllPromises();

    wrapper.update();

    expect(wrapper.find(dataQa('db-checks-failed-checks-spinner'))).toHaveLength(0);

    wrapper.unmount();
  });

  it('should log an error if the fetch alerts API call fails', () => {
    const spy = jest.spyOn(CheckService, 'getActiveAlerts').mockImplementation(() => { throw Error('test'); });

    const wrapper: ReactWrapper<FailedChecksTabProps, {}, any> = mount(
      <FailedChecksTab hasNoAccess={false} isSttEnabled />,
    );

    expect(console.error).toBeCalledTimes(1);

    spy.mockClear();
    wrapper.unmount();
  });

  it('should log an error if the run checks API call fails', () => {
    const spy = jest.spyOn(CheckService, 'runDbChecks').mockImplementation(() => { throw Error('test'); });
    const wrapper: ReactWrapper<FailedChecksTabProps, {}, any> = mount(
      <FailedChecksTab hasNoAccess={false} isSttEnabled />,
    );
    const runChecksButton = wrapper.find(ButtonWithSpinner);

    runChecksButton.simulate('click');

    expect(console.error).toBeCalledTimes(1);

    spy.mockClear();
    wrapper.unmount();
  });

  it('should call the API to run checks when the "run checks" button gets clicked', () => {
    const runChecksSpy = jest.spyOn(CheckService, 'runDbChecks');
    const wrapper: ReactWrapper<FailedChecksTabProps, {}, any> = mount(
      <FailedChecksTab hasNoAccess={false} isSttEnabled />,
    );
    const runChecksButton = wrapper.find(ButtonWithSpinner);

    expect(runChecksSpy).toBeCalledTimes(0);
    runChecksButton.simulate('click');
    expect(runChecksSpy).toBeCalledTimes(1);

    runChecksSpy.mockClear();
    wrapper.unmount();
  });


  it('should call the API to fetch alerts after the one to run checks', async () => {
    jest.useFakeTimers();
    const getAlertsSpy = jest.spyOn(CheckService, 'getActiveAlerts');
    const wrapper: ReactWrapper<FailedChecksTabProps, {}, any> = mount(
      <FailedChecksTab hasNoAccess={false} isSttEnabled />,
    );
    const runChecksButton = wrapper.find(ButtonWithSpinner);

    expect(getAlertsSpy).toBeCalledTimes(1);

    runChecksButton.simulate('click');

    await runAllPromises();
    jest.runAllTimers();
    wrapper.update();

    expect(getAlertsSpy).toBeCalledTimes(2);

    jest.useRealTimers();
    getAlertsSpy.mockClear();
    wrapper.unmount();
  });

  it('should render a table after having fetched the alerts', async () => {
    const wrapper: ReactWrapper<FailedChecksTabProps, {}, any> = mount(
      <FailedChecksTab hasNoAccess={false} isSttEnabled />,
    );

    expect(wrapper.find(Table)).toHaveLength(0);

    await runAllPromises();
    wrapper.update();

    expect(wrapper.find(Table)).toHaveLength(1);

    wrapper.unmount();
  });
});
