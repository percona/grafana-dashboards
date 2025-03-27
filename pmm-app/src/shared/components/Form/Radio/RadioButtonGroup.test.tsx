import React from 'react';
import { render } from '@testing-library/react';
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
  dataTestId: 'radio-button-group',
  onChange: jest.fn(),
};

describe('RadioButtonGroup::', () => {
  it('Renders correctly with selected option', () => {
    const root = render(<RadioButtonGroup {...testProps} />);
    const wrapper = root.getByTestId('radio-button-group');

    expect(wrapper.children.length).toBe(4);
    expect(wrapper.firstElementChild?.id).toEqual(options[0].key);
    expect(wrapper.firstElementChild?.getAttribute('name')).toEqual(testProps.name);
    expect(wrapper.querySelectorAll('label')[0]).toHaveTextContent(options[0].value);
    expect(wrapper.querySelectorAll('label')[1].className).toContain('active');
  });
  it('Renders correctly with disabled options', () => {
    const root = render(<RadioButtonGroup {...testProps} disabledOptions={['option1']} />);
    const wrapper = root.getByTestId('radio-button-group');

    expect(wrapper.querySelectorAll('label')[0].className).toContain('disabled');
  });
});
