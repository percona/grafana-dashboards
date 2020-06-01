import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'react-final-form';
import { TextAreaField } from './TextArea';

describe('TextArea field', () => {
  it('should take the name prop', () => {
    const root = mount(<Form onSubmit={jest.fn()} render={() => <TextAreaField name="testField" />} />);

    expect(root.find('textarea').prop('name')).toEqual('testField');
    expect(root).toMatchSnapshot();

    root.unmount();
  });
});
