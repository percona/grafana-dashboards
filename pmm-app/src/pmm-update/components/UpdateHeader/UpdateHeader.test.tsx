import React from 'react';
import { shallow } from 'enzyme';

import { UpdateHeader } from './UpdateHeader';

jest.mock('../../../react-plugins-deps/components/helpers/notification-manager');

const installedFullVersion = 'x.y.z-rc.j+1234567890';
const installedVersion = 'x.y.z';
const installedVersionDate = '23 Jun';

const installedVersionDetails = {
  installedFullVersion,
  installedVersion,
  installedVersionDate,
};

describe('UpdateHeader::', () => {
  let wrapper: ReturnType<typeof shallow> | undefined;

  beforeEach(() => {
    wrapper = shallow(<UpdateHeader installedVersionDetails={installedVersionDetails} />);
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  it('should show only the short version by default', () => {
    expect(wrapper?.find('header > p > span').text()).toEqual(`${installedVersion} ${installedVersionDate}`);
  });

  it('should show the full version on alt-click', () => {
    wrapper?.find('header > p').simulate('click', { altKey: true });
    expect(wrapper?.find('header > p').text()).toEqual(
      `Current version: ${installedFullVersion} ${installedVersionDate}`
    );
  });
});
