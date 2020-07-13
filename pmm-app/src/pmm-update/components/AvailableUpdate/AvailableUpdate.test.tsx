import React from 'react';
import { shallow } from 'enzyme';
import { LinkButton } from '@grafana/ui';

import { AvailableUpdate } from './AvailableUpdate';

jest.mock('../../../react-plugins-deps/components/helpers/notification-manager');

const nextFullVersion = 'x.y.z-rc.j+1234567890';
const nextVersion = 'x.y.z';
const newsLink = '';
const nextVersionDate = '23 Jun';

const nextVersionDetails = {
  nextVersionDate, nextVersion, nextFullVersion, newsLink
};

describe('AvailableUpdate::', () => {
  let wrapper: ReturnType<typeof shallow> | undefined;

  beforeEach(() => {
    wrapper = shallow(<AvailableUpdate nextVersionDetails={nextVersionDetails} />);
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  it('should show only the short version by default', () => {
    expect(wrapper?.find('section > p').length).toEqual(2);
    expect(wrapper?.find('section > p > span').length).toEqual(2);
    expect(
      wrapper
        ?.find('section > p')
        .at(1)
        .text()
    ).toEqual(`${nextVersion} (${nextVersionDate})`);
  });

  it('should show the news link if present', () => {
    expect(wrapper?.find('section > p').find(LinkButton).length).toEqual(0);

    const nextVersionDetails = {
      nextVersionDate,
      nextVersion,
      nextFullVersion,
      newsLink: 'https://percona.com',
    };

    wrapper = shallow(<AvailableUpdate nextVersionDetails={nextVersionDetails} />);

    expect(wrapper?.find('section > p').find(LinkButton).length).toEqual(1);
  });

  it('should show the full version on alt-click', () => {
    wrapper?.find('section').simulate('click', { altKey: true });
    expect(
      wrapper
        ?.find('section > p')
        .at(1)
        .text()
    ).toEqual(`${nextFullVersion} (${nextVersionDate})`);
  });
});
