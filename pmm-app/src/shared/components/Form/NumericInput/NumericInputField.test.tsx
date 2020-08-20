import React from 'react';
import { mount } from 'enzyme';
import { NumericInputField } from './NumericInputField';

describe('NumericInputField::', () => {
  it('should render NumericInputField correctly', () => {
    const wrapper = mount(<NumericInputField input={{ value: 100, readOnly: true }} />);

    expect(wrapper.find('input').prop('value')).toBe(100);
    expect(wrapper.find('input').prop('disabled')).toBeFalsy();
  });

  it('should render NumericInputField disabled', () => {
    const wrapper = mount(<NumericInputField disabled />);

    expect(wrapper.find('input').prop('disabled')).toBeTruthy();
  });

  it('should render NumericInputField with errors', () => {
    const wrapper = mount(
      <NumericInputField
        meta={{ error: 'Required field' } as any}
      />
    );

    expect(wrapper.text()).toContain('Required field');
  });
});
