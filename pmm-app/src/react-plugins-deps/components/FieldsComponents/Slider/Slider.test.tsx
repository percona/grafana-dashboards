// Just a stub test
import {SliderField} from './Slider';
import React from 'react';
import renderer from 'react-test-renderer';
import {renderHook} from '@testing-library/react-hooks';
import {useForm} from 'react-final-form-hooks';

describe('Slider field test', () => {
  it('Slider renders correct without props', () => {
    renderHook(() => {
      const { form } = useForm({
        onSubmit: values => {
          console.log(values);
        },
      });

      const marks = {
        0: 'Low',
        1: 'Medium',
        2: 'High',
      };

      const component = renderer.create(<SliderField marks={marks} form={form} defaultValue={2} name={'metrics_resolutions_slider'} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
