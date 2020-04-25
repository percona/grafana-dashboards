// Just a stub test
import { SelectField } from './Select';
import React from 'react';
import renderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { Form } from 'react-final-form';

describe('Select field test', () => {
  it('Select renders correct without props', () => {
    renderHook(() => {
      const component = renderer.create(
        <Form onSubmit={() => null} render={() => <SelectField defaultValue="tester" name="test_field" />} />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
