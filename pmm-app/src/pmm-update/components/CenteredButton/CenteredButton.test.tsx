import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '@grafana/ui';

import { CenteredButton } from './CenteredButton';

describe('CenteredButton::', () => {
  it('should pass props to child component', () => {
    const wrapper = shallow(<CenteredButton data-test="foobar">Test</CenteredButton>);

    expect(wrapper.find(Button).length).toEqual(1);
    expect(wrapper.find(Button).props()).toHaveProperty('data-test', 'foobar');

    wrapper.unmount();
  });
});
