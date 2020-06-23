import React from 'react';
import { shallow } from 'enzyme';

import { CenteredButton, UpdateButton } from 'pmm-update/components';

jest.mock('../../../react-plugins-deps/components/helpers/notification-manager');

describe('UpdateButton::', () => {
  const nextVersion = 'x.y.z';
  const fakeHandleClick = jest.fn();

  it('should show the correct text', () => {
    const wrapper = shallow(<UpdateButton onClick={fakeHandleClick} nextVersion={nextVersion} />);

    expect(wrapper.find(CenteredButton).props()).toHaveProperty('children', ['Update to ', nextVersion]);

    wrapper.unmount();
  });

  it('should pass props to child component', () => {
    const wrapper = shallow(<UpdateButton onClick={fakeHandleClick} disabled nextVersion={nextVersion} />);

    expect(wrapper.find(CenteredButton).props()).toHaveProperty('disabled', true);

    wrapper.unmount();
  });

  it('should call the passed onClick handler on Button click', () => {
    const wrapper = shallow(<UpdateButton onClick={fakeHandleClick} nextVersion={nextVersion} />);

    wrapper.find(CenteredButton).simulate('click');

    expect(fakeHandleClick).toBeCalledTimes(1);

    wrapper.unmount();
  });
});
