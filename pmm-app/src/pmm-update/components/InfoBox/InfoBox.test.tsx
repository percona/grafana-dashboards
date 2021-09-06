import React from 'react';
import { mount } from 'enzyme';

import { InfoBox } from './InfoBox';
import { Messages } from './InfoBox.messages';

describe('InfoBox::', () => {
  it('should show that there are no updates by default', () => {
    const wrapper = mount(<InfoBox />);

    expect(wrapper.find('section > p').length).toEqual(2);
    expect(
      wrapper
        .find('section > p')
        .at(0)
        .text(),
    ).toEqual(Messages.noUpdates);
    expect(
      wrapper
        .find('section > p')
        .at(1)
        .text(),
    ).toEqual(Messages.updatesNotice);

    wrapper.unmount();
  });

  it('should show a different message if upToDate is true', () => {
    const wrapper = mount(<InfoBox upToDate />);

    expect(wrapper.find('section > p').length).toEqual(1);
    expect(
      wrapper
        .find('section > p')
        .at(0)
        .text(),
    ).toEqual(Messages.upToDate);

    wrapper.unmount();
  });

  it('should show an insufficient access message', () => {
    const wrapper = mount(<InfoBox hasNoAccess />);

    expect(wrapper.find('section > p').length).toEqual(1);
    expect(wrapper.text()).toEqual(Messages.noAccess);

    wrapper.unmount();
  });

  it('should show updates disabled messages', () => {
    const wrapper = mount(<InfoBox updatesDisabled />);

    expect(wrapper.find('section > p').length).toEqual(1);
    expect(wrapper.text()).toEqual(`${Messages.updatesDisabled}${Messages.pmmSettings}`);

    wrapper.unmount();
  });

  it('should show not online messages', () => {
    const wrapper = mount(<InfoBox isOnline={false} />);

    expect(wrapper.find('section > p').length).toEqual(1);
    expect(wrapper.text()).toEqual(Messages.notOnline);

    wrapper.unmount();
  });
});
