import React from 'react';
import { shallow } from 'enzyme';
import { InputLabel } from './InputLabel';

describe('InputLabel::', () => {
  it('should render a label element correctly', () => {
    const wrapper = shallow(<InputLabel>Test</InputLabel>);

    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('label').text()).toEqual('Test');

    wrapper.unmount();
  });

  it('should correctly pass a class to the child label', () => {
    const wrapper = shallow(<InputLabel className="testClass">Test</InputLabel>);

    expect(wrapper.find('label').hasClass('testClass')).toBe(true);

    wrapper.unmount();
  });
});
