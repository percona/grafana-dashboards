import React from 'react';
import { shallow } from 'enzyme';
import { RadioButton } from './RadioButton';

const testProps = {
  id: 'test-id',
  name: 'test-name',
  active: false,
  onChange: jest.fn(),
};

describe('RadioButton::', () => {
  it('Renders correctly', () => {
    const root = shallow(<RadioButton {...testProps}>Test</RadioButton>);
    const input = root.find('input');
    const label = root.find('label');

    expect(label.text()).toEqual('Test');
    expect(input.prop('id')).toEqual(testProps.id);
    expect(input.prop('name')).toEqual(testProps.name);
  });

  it('Renders with active class', () => {
    const root = shallow(<RadioButton {...testProps} active>Test</RadioButton>);

    expect(root.find('label').prop('className')).toContain('active');
  });

  it('Renders with disabled class', () => {
    const root = shallow(<RadioButton {...testProps} disabled>Test</RadioButton>);

    expect(root.find('label').prop('className')).toContain('disabled');
  });

  it('Calls onChange when clicked', () => {
    const root = shallow(<RadioButton {...testProps}>Test</RadioButton>);

    root.find('label').simulate('click');

    expect(testProps.onChange).toHaveBeenCalled();
  });
});
