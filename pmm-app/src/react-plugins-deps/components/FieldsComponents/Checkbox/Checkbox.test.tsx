// Just a stub test
import { CheckboxField } from './Checkbox';
import React from 'react';
import renderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-final-form-hooks';

describe('Checkbox field test', () => {
  it('Checkbox renders correct without props', () => {
    renderHook(() => {
      const { form } = useForm({
        onSubmit: values => {
          console.log(values);
        },
      });

      const component = renderer.create(<CheckboxField form={form} name={'test-field'} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
