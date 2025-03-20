import React from 'react';
import renderer from 'react-test-renderer';
import { Form } from 'react-final-form';
import { CheckboxField } from './Checkbox';

xdescribe('Checkbox field test', () => {
  it('Checkbox renders correct without props', () => {
    const tree = renderer.create(<Form onSubmit={jest.fn()} render={() => <CheckboxField name="test_field" />} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
