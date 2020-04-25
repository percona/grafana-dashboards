// Just a stub test
import { TextAreaField } from './TextArea';
import React from 'react';
import renderer from 'react-test-renderer';
import { Form } from 'react-final-form';
describe('TextArea field test', () => {
  it('TextArea renders correct without props', () => {
    const component = renderer.create(
      <Form onSubmit={() => null} render={() => <TextAreaField name="test_field" />} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
