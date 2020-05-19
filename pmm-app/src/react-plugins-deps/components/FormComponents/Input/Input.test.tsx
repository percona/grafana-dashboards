import { InputField } from './Input';
import React from 'react';
import renderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { Form } from 'react-final-form';

xdescribe('Input field test', () => {
  it('Input renders correct without props', () => {
    renderHook(() => {
      const component = renderer.create(
        <Form onSubmit={jest.fn()} render={() => <InputField name="test_field" />} />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
