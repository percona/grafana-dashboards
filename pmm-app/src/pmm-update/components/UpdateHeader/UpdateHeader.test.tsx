import React from 'react';
import { shallow } from 'enzyme';

import { UpdateHeader } from './UpdateHeader';

jest.mock('../../../react-plugins-deps/components/helpers/notification-manager');

describe('UpdateHeader::', () => {
  const longVersion = 'x.y.z-rc.j+1234567890';
  const shortVersion = 'x.y.z';
  const releaseDate = '23 Jun';

  it('should show only the short version by default', () => {
    const wrapper = shallow(
      <UpdateHeader currentReleaseDate={releaseDate} fullVersion={longVersion} version={shortVersion} />
    );

    expect(wrapper.find('header > p > span').text()).toEqual(`${shortVersion} ${releaseDate}`);

    wrapper.unmount();
  });

  it('should show the full version on alt-click', () => {
    const wrapper = shallow(
      <UpdateHeader currentReleaseDate={releaseDate} fullVersion={longVersion} version={shortVersion} />
    );

    wrapper.find('header > p').simulate('click', { altKey: true });
    expect(wrapper.find('header > p').text()).toEqual(`Current version: ${longVersion} ${releaseDate}`);

    wrapper.unmount();
  });
});
