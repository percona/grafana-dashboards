import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'react-final-form';
import { InputField } from './Input';

describe('Input field::', () => {
  it('Input renders without props', () => {
    const root = mount(<Form onSubmit={jest.fn()} render={() => <InputField name="testField" />} />);

    expect(root.find('input[name="testField"]')).toHaveLength(1);
    expect(root).toMatchSnapshot();

    root.unmount();
  });
});
