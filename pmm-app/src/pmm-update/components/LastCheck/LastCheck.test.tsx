import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '@grafana/ui';

import { LastCheck } from './LastCheck';

describe('LastCheck::', () => {
  const lastCheckDate = '12345';
  const fakeHandleClick = jest.fn();

  it('should show the passed last check date', () => {
    const wrapper = shallow(<LastCheck onCheckForUpdates={fakeHandleClick} lastCheckDate={lastCheckDate} />);

    expect(wrapper.find('div > p').text()).toEqual(`Last check: ${lastCheckDate}`);

    wrapper.unmount();
  });

  it('should call the passed onClick handler on Button click', () => {
    const wrapper = shallow(<LastCheck onCheckForUpdates={fakeHandleClick} lastCheckDate={lastCheckDate} />);

    wrapper.find(Button).simulate('click');

    expect(fakeHandleClick).toBeCalledTimes(1);

    wrapper.unmount();
  });
});
