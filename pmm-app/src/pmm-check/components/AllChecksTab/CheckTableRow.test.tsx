import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { CheckService } from 'pmm-check/Check.service';
import { ButtonWithSpinner } from 'shared/components/Form';
import { CheckTableRow } from './CheckTableRow';
import { Messages } from './AllChecksTab.messages';

jest.mock('shared/components/helpers/notification-manager');

const originalConsoleError = jest.fn();

const runAllPromises = () => new Promise(setImmediate);

const TEST_CHECK = {
  summary: 'Test',
  name: 'test',
  description: 'test description',
  disabled: false,
};

const TEST_CHECK_DISABLED = {
  summary: 'Test disabled',
  name: 'test disabled',
  description: 'test disabled description',
  disabled: true,
};

const fakeOnSuccess = jest.fn();

describe('CheckTableRow::', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    jest.resetAllMocks();
  });

  it('should render a check row correctly', () => {
    let wrapper: ReactWrapper<{}, {}, any> = mount(
      <CheckTableRow check={TEST_CHECK} onSuccess={fakeOnSuccess} />,
    );

    let tdElements = wrapper.find('tr').find('td');

    expect(tdElements.at(0).text()).toBe('Test');
    expect(tdElements.at(1).text()).toBe('test description');
    expect(tdElements.at(2).text()).toBe(Messages.enabled);
    expect(tdElements.at(3).text()).toBe(Messages.disable);
    expect(tdElements.at(3).find(ButtonWithSpinner)).toHaveLength(1);
    expect(tdElements.at(3).find(ButtonWithSpinner).prop('variant')).toBe('destructive');

    wrapper = mount(
      <CheckTableRow check={TEST_CHECK_DISABLED} onSuccess={fakeOnSuccess} />,
    );
    tdElements = wrapper.find('tr').find('td');

    expect(tdElements.at(2).text()).toBe(Messages.disabled);
    expect(tdElements.at(3).text()).toBe(Messages.enable);
    expect(tdElements.at(3).find(ButtonWithSpinner).prop('variant')).toBe('primary');

    wrapper.unmount();
  });

  it('should call an API to change the check status when the action button gets clicked', async () => {
    const spy = jest.spyOn(CheckService, 'changeCheck');
    let wrapper: ReactWrapper<{}, {}, any> = mount(
      <CheckTableRow check={TEST_CHECK} onSuccess={fakeOnSuccess} />,
    );

    expect(spy).toBeCalledTimes(0);

    wrapper.find(ButtonWithSpinner).simulate('click');

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({ params: [{ name: TEST_CHECK.name, disable: true }] });

    wrapper = mount(
      <CheckTableRow check={TEST_CHECK_DISABLED} onSuccess={fakeOnSuccess} />,
    );

    wrapper.find(ButtonWithSpinner).simulate('click');

    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith({ params: [{ name: TEST_CHECK_DISABLED.name, enable: true }] });

    spy.mockClear();
    wrapper.unmount();
  });

  it('should call the onSuccess callback after the change API succeeds', async () => {
    const spy = jest.spyOn(CheckService, 'changeCheck');
    const wrapper: ReactWrapper<{}, {}, any> = mount(
      <CheckTableRow check={TEST_CHECK} onSuccess={fakeOnSuccess} />,
    );

    expect(fakeOnSuccess).toBeCalledTimes(0);

    wrapper.find(ButtonWithSpinner).simulate('click');

    await runAllPromises();
    wrapper.update();

    expect(fakeOnSuccess).toBeCalledTimes(1);

    spy.mockClear();
    wrapper.unmount();
  });

  it('should log an error if the API call fails', () => {
    const spy = jest.spyOn(CheckService, 'changeCheck').mockImplementation(() => { throw Error('test'); });

    const wrapper: ReactWrapper<{}, {}, any> = mount(
      <CheckTableRow check={TEST_CHECK} onSuccess={fakeOnSuccess} />,
    );

    wrapper.find(ButtonWithSpinner).simulate('click');

    expect(console.error).toBeCalledTimes(1);

    spy.mockClear();
    wrapper.unmount();
  });
});
