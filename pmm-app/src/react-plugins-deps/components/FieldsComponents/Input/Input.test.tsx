// Just a stub test
import { InputField } from './Input';
import React from 'react';
import renderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-final-form-hooks';

xdescribe('Input field test', () => {
  it('Input renders correct without props', () => {
    renderHook(() => {
      const { form } = useForm({
        onSubmit: values => {
          console.log(values);
        },
      });

      const component = renderer.create(<InputField form={form} name={'test-field'} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
