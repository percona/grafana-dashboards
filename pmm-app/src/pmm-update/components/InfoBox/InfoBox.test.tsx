import React from 'react';
import { shallow } from 'enzyme';

import { InfoBox } from './InfoBox';
import { Messages } from './InfoBox.messages';

describe('InfoBox::', () => {
  it('should show that there are no updates by default', () => {
    const wrapper = shallow(<InfoBox />);

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
    const wrapper = shallow(<InfoBox upToDate />);

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
