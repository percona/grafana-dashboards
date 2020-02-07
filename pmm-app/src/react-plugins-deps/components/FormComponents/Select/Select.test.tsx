// Just a stub test
import { SelectField } from './Select';
import React from 'react';
import renderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-final-form-hooks';

describe('Select field test', () => {
  it('Select renders correct without props', () => {
    renderHook(() => {
      const { form } = useForm({
        onSubmit: () => {},
      });

      const component = renderer.create(<SelectField form={form} name={'test-field'} defaultValue={'tester'} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
