import React from 'react';
import { shallow } from 'enzyme';

import { CurrentVersion } from './CurrentVersion';

jest.mock('../../../react-plugins-deps/components/helpers/notification-manager');

const installedFullVersion = 'x.y.z-rc.j+1234567890';
const installedVersion = 'x.y.z';
const installedVersionDate = '23 Jun';

const installedVersionDetails = {
  installedFullVersion,
  installedVersion,
  installedVersionDate,
};

describe('CurrentVersion::', () => {
  let wrapper: ReturnType<typeof shallow> | undefined;

  beforeEach(() => {
    wrapper = shallow(<CurrentVersion installedVersionDetails={installedVersionDetails} />);
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  it('should show only the short version by default', () => {
    expect(wrapper?.find('section > p > span').text()).toEqual(
      `${installedVersion} (${installedVersionDate})`
    );
  });

  it('should show the full version on alt-click', () => {
    wrapper?.find('section > p').simulate('click', { altKey: true });
    expect(wrapper?.find('section > p').text()).toEqual(
      `Current version: ${installedFullVersion} (${installedVersionDate})`
    );
  });
});
