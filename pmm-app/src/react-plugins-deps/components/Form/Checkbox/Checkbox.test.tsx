// Just a stub test
import { CheckboxField } from './Checkbox';
import React from 'react';
import renderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { Form } from 'react-final-form';

describe('Checkbox field test', () => {
  it('Checkbox renders correct without props', () => {
    renderHook(() => {
      const component = renderer.create(
        <Form onSubmit={() => null} render={() => <CheckboxField name="test_field" />} />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
