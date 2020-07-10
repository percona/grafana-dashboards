import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'react-final-form';
import { PasswordField } from './Password';

describe('Password field', () => {
  it('Password renders without props', () => {
    const root = mount(<Form onSubmit={jest.fn()} render={() => <PasswordField name="test_field" />} />);

    expect(root).toMatchSnapshot();
    root.unmount();
  });
});
