import React from 'react';
import { shallow } from 'enzyme';

import { ProgressModalHeader } from './ProgressModalHeader';
import { Messages } from './ProgressModalHeader.messages';

describe('ProgressModalHeader::', () => {
  it('should show that the upgrade is in progress by default', () => {
    const wrapper = shallow(<ProgressModalHeader />);

    expect(wrapper.find('h4').text()).toEqual(Messages.updateInProgress);

    wrapper.unmount();
  });

  it('should show that the upgrade succeeded if isUpdated is true', () => {
    const wrapper = shallow(<ProgressModalHeader isUpdated />);

    expect(wrapper.find('h4').text()).toEqual(Messages.updateSucceeded);

    wrapper.unmount();
  });

  it('should show ignore updateFailed if isUpdated is true', () => {
    const wrapper = shallow(<ProgressModalHeader isUpdated updateFailed />);

    expect(wrapper.find('h4').text()).toEqual(Messages.updateSucceeded);

    wrapper.unmount();
  });

  it('should show the passed error message if the upgrade failed', () => {
    const errorMessage = 'Test Error';
    const wrapper = shallow(<ProgressModalHeader updateFailed errorMessage={errorMessage} />);

    expect(
      wrapper
        .find('h4')
        .at(0)
        .text()
    ).toEqual(Messages.updateFailed);
    expect(
      wrapper
        .find('h4')
        .at(1)
        .text()
    ).toEqual(errorMessage);

    wrapper.unmount();
  });
});
