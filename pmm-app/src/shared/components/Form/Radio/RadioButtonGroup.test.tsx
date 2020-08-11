import React from 'react';
import { mount } from 'enzyme';
import { SelectableValue } from '@grafana/data';
import { RadioButtonGroup, RadioButtonGroupProps } from './RadioButtonGroup';

const options: SelectableValue[] = [
  { key: 'option1', value: 'Option 1' },
  { key: 'option2', value: 'Option 2' },
];

const testProps: RadioButtonGroupProps = {
  selected: options[1].key,
  name: 'test-radio-group',
  options,
  dataQa: 'radio-button-group',
  onChange: jest.fn(),
};

describe('RadioButtonGroup::', () => {
  it('Renders correctly with selected option', () => {
    const root = mount(<RadioButtonGroup {...testProps} />);
    const wrapper = root.find('[data-qa="radio-button-group"]');

    expect(wrapper.children().length).toBe(2);
    expect(wrapper.childAt(0).prop('id')).toEqual(options[0].key);
    expect(wrapper.childAt(0).prop('name')).toEqual(testProps.name);
    expect(wrapper.childAt(0).find('label').text()).toEqual(options[0].value);
    expect(wrapper.childAt(1).find('label').prop('className')).toContain('active');
  });
});
