// Just a stub test
import { SliderField } from './Slider';
import React from 'react';
import renderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { Form } from 'react-final-form';

describe('Slider field test', () => {
  it('Slider renders correct without props', () => {
    renderHook(() => {
      const marks = {
        0: 'Low',
        1: 'Medium',
        2: 'High',
      };

      const component = renderer.create(
        <Form
          onSubmit={() => null}
          render={() => <SliderField marks={marks} defaultValue={2} name="metrics_resolutions_slider" />}
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
