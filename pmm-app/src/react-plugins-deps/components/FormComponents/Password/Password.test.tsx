import { PasswordField } from './Password';
import React from 'react';
import renderer from 'react-test-renderer';
import { Form } from 'react-final-form';

describe('Password field test', () => {
  it('Password renders correct without props', () => {
    const component = renderer.create(
      <Form onSubmit={jest.fn()} render={() => <PasswordField name="test_field" />} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
