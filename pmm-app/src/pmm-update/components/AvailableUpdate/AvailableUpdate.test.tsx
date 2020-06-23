import React from 'react';
import { shallow } from 'enzyme';

import { AvailableUpdate } from './AvailableUpdate';

jest.mock('../../../react-plugins-deps/components/helpers/notification-manager');

describe('AvailableUpdate::', () => {
  const longVersion = 'x.y.z-rc.j+1234567890';
  const shortVersion = 'x.y.z';
  const newsLink = 'https://percona.com';
  const releaseDate = '23 Jun';

  it('should show only the short version by default', () => {
    const wrapper = shallow(
      <AvailableUpdate
        newReleaseDate={releaseDate}
        nextFullVersion={longVersion}
        nextVersion={shortVersion}
      />
    );

    expect(wrapper.find('section > div > p').length).toEqual(2);
    expect(wrapper.find('section > div > p > em').length).toEqual(1);
    expect(
      wrapper
        .find('section > div > p')
        .at(1)
        .text()
    ).toEqual(`${shortVersion} ${releaseDate}`);

    wrapper.unmount();
  });

  it('should show the news link if present', () => {
    const wrapper = shallow(
      <AvailableUpdate
        newReleaseDate={releaseDate}
        newsLink={newsLink}
        nextFullVersion={longVersion}
        nextVersion={shortVersion}
      />
    );

    expect(wrapper.find('section > div > p').length).toEqual(2);
    expect(wrapper.find('section > div > p > a').length).toEqual(1);

    wrapper.unmount();
  });

  it('should show the full version on alt-click', () => {
    const wrapper = shallow(
      <AvailableUpdate
        newReleaseDate={releaseDate}
        nextFullVersion={longVersion}
        nextVersion={shortVersion}
      />
    );

    wrapper.find('section > div').simulate('click', { altKey: true });
    expect(
      wrapper
        .find('section > div > p')
        .at(1)
        .text()
    ).toEqual(`${longVersion} ${releaseDate}`);

    wrapper.unmount();
  });
});
