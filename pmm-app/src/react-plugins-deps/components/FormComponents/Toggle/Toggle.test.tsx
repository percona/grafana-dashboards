import React from 'react';
import renderer from 'react-test-renderer';
import { Form } from 'react-final-form';
import { ToggleField } from './Toggle';

describe('Toggle field test', () => {
  it('Toggle renders correct without props', () => {
    const component = renderer.create(
      <Form onSubmit={jest.fn()} render={() => <ToggleField name="test_field" />} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
