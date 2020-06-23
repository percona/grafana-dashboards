import React from 'react';
import { shallow } from 'enzyme';

import { UpdateInfoBox } from './UpdateInfoBox';
import { Messages } from './UpdateInfoBox.messages';

describe('UpdateInfoBox::', () => {
  it('should show that there are no updates by default', () => {
    const wrapper = shallow(<UpdateInfoBox />);

    expect(wrapper.find('section > p').length).toEqual(2);
    expect(
      wrapper
        .find('section > p')
        .at(0)
        .text()
    ).toEqual(Messages.noUpdates);
    expect(
      wrapper
        .find('section > p')
        .at(1)
        .text()
    ).toEqual(Messages.updatesNotice);

    wrapper.unmount();
  });

  it('should show a different message if upToDate is true', () => {
    const wrapper = shallow(<UpdateInfoBox upToDate />);

    expect(wrapper.find('section > p').length).toEqual(1);
    expect(
      wrapper
        .find('section > p')
        .at(0)
        .text()
    ).toEqual(Messages.upToDate);

    wrapper.unmount();
  });
});
