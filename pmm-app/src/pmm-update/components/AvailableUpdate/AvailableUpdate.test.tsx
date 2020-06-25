import React from 'react';
import { shallow } from 'enzyme';

import { AvailableUpdate } from './AvailableUpdate';

jest.mock('../../../react-plugins-deps/components/helpers/notification-manager');

const nextFullVersion = 'x.y.z-rc.j+1234567890';
const nextVersion = 'x.y.z';
const newsLink = 'https://percona.com';
const nextVersionDate = '23 Jun';

const nextVersionDetails = { nextVersionDate, nextVersion, nextFullVersion, newsLink };

describe('AvailableUpdate::', () => {
  let wrapper: ReturnType<typeof shallow> | undefined;

  beforeEach(() => {
    wrapper = shallow(<AvailableUpdate nextVersionDetails={nextVersionDetails} />);
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  it('should show only the short version by default', () => {
    expect(wrapper?.find('section > div > p').length).toEqual(2);
    expect(wrapper?.find('section > div > p > em').length).toEqual(1);
    expect(
      wrapper
        ?.find('section > div > p')
        .at(1)
        .text()
    ).toEqual(`${nextVersion} ${nextVersionDate}`);
  });

  it('should show the news link if present', () => {
    expect(wrapper?.find('section > div > p').length).toEqual(2);
    expect(wrapper?.find('section > div > p > a').length).toEqual(1);
  });

  it('should show the full version on alt-click', () => {
    wrapper?.find('section > div').simulate('click', { altKey: true });
    expect(
      wrapper
        ?.find('section > div > p')
        .at(1)
        .text()
    ).toEqual(`${nextFullVersion} ${nextVersionDate}`);
  });
});
