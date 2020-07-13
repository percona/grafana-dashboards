import React from 'react';
import { mount, shallow } from 'enzyme';
import { Button, Spinner } from '@grafana/ui';

import { InfoBox, ProgressModal } from 'pmm-update/components';
import { usePerformUpdate, useVersionDetails } from 'pmm-update/hooks';
import { UpdatePanel } from 'pmm-update/UpdatePanel';

jest.mock('../react-plugins-deps/components/helpers/notification-manager');

// NOTE (nicolalamacchia): these mocks are here because some test cases alter them
jest.mock('./hooks/useVersionDetails', () => ({
  useVersionDetails: jest.fn(),
}));
const mockedUseVersionDetails = useVersionDetails as jest.Mock;

jest.mock('./hooks/usePerformUpdate', () => ({
  usePerformUpdate: jest.fn(),
}));
const mockedUsePerformUpdate = usePerformUpdate as jest.Mock;

const fakeLaunchUpdate = jest.fn();
const fakeGetCurrentVersionDetails = jest.fn();

const installedVersionDetails = {
  installedFullVersion: 'a.b.c-rc.i+0123456789',
  installedVersionDate: 'June 08',
  installedVersion: 'a.b.c',
};
const nextVersionDetails = {
  nextFullVersion: 'x.y.z-rc.j+1234567890',
  nextVersionDate: 'June 09',
  nextVersion: 'x.y.z',
  newsLink: 'https://percona.com',
};
const lastCheckDate = 'June 10, 19:16';

describe('UpdatePanel::', () => {
  beforeEach(() => {
    // default mocks
    mockedUsePerformUpdate.mockImplementation(() => ['', '', false, false, fakeLaunchUpdate]);
    mockedUseVersionDetails.mockImplementation(() => [
      {
        installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable: false
      },
      '',
      false,
      true,
      fakeGetCurrentVersionDetails,
    ]);
  });

  afterEach(() => {
    mockedUsePerformUpdate.mockClear();
    mockedUseVersionDetails.mockClear();
  });

  it('shows a box telling that no upgrades are available by default', () => {
    const wrapper = shallow(<UpdatePanel />);

    expect(wrapper.find(InfoBox).length).toEqual(1);
    expect(wrapper.find(InfoBox).props()).toHaveProperty('upToDate', false);

    wrapper.unmount();
  });

  it('should return the correct values if the upgrade initialization was successful', () => {
    const wrapper = shallow(<UpdatePanel />);

    expect(mockedUseVersionDetails).toBeCalledTimes(1);

    wrapper?.unmount();
  });

  test('the modal is closed by default', () => {
    const wrapper = shallow(<UpdatePanel />);

    const modal = wrapper.find(ProgressModal);

    expect(modal.length).toEqual(1);
    expect(modal.props()).toHaveProperty('isOpen', false);

    wrapper.unmount();
  });

  it('should launch the upgrade if the upgrade button is clicked', () => {
    mockedUseVersionDetails.mockImplementation(() => [
      {
        installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable: true
      },
      '',
      false,
      true,
      fakeGetCurrentVersionDetails,
    ]);

    const wrapper = shallow(<UpdatePanel />);

    wrapper?.find(Button).simulate('click');

    expect(fakeLaunchUpdate).toBeCalledTimes(1);

    wrapper?.unmount();
  });

  it('should show InfoBox with the upToDate prop if !isUpdateAvailable && !isDefaultView', () => {
    mockedUseVersionDetails.mockImplementation(() => [
      {
        installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable: false
      },
      '',
      false,
      false,
      fakeGetCurrentVersionDetails,
    ]);

    const wrapper = shallow(<UpdatePanel />);

    expect(wrapper.find(InfoBox).length).toEqual(1);
    expect(wrapper.find(InfoBox).props()).toHaveProperty('upToDate');

    wrapper.unmount();
  });

  it('should not show InfoBox if isUpdateAvailable is true and !isDefaultView', () => {
    mockedUseVersionDetails.mockImplementation(() => [
      {
        installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable: true
      },
      '',
      false,
      false,
      fakeGetCurrentVersionDetails,
    ]);

    const wrapper = shallow(<UpdatePanel />);

    expect(wrapper.find(InfoBox).length).toEqual(0);

    wrapper.unmount();
  });

  it('should show a spinner if loading', () => {
    mockedUseVersionDetails.mockImplementation(() => [
      {
        installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable: true
      },
      '',
      true,
      false,
      fakeGetCurrentVersionDetails,
    ]);

    const wrapper = shallow(<UpdatePanel />);

    expect(wrapper.find(Spinner).length).toEqual(1);
    expect(wrapper.find(Button).length).toEqual(0);
    expect(wrapper.find(InfoBox).length).toEqual(0);

    wrapper.unmount();
  });

  it('should pass error messages to the modal correctly', () => {
    mockedUseVersionDetails.mockImplementation(() => [
      {
        installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable: true
      },
      'test',
      true,
      false,
      fakeGetCurrentVersionDetails,
    ]);

    const wrapper = mount(<UpdatePanel />);

    expect(wrapper.find(ProgressModal).props()).toHaveProperty('errorMessage', 'test');
    wrapper.unmount();
  });

  it('should pass props to the modal correctly', () => {
    mockedUsePerformUpdate.mockImplementation(() => ['output', 'error msg', false, false, fakeLaunchUpdate]);
    const wrapper = mount(<UpdatePanel />);

    expect(wrapper.find(ProgressModal).props()).toHaveProperty('output', 'output');
    expect(wrapper.find(ProgressModal).props()).toHaveProperty('errorMessage', 'error msg');

    wrapper.unmount();
  });
});
