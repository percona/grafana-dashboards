import React from 'react';
import { Form } from 'react-final-form';
import { shallow } from 'enzyme';
import { SliderField } from './Slider';

describe('Slider', () => {
  it('Slider renders correct without props', () => {
    const marks = {
      0: 'Low',
      1: 'Medium',
      2: 'High',
    };

    const onSubmit = jest.fn();
    const component = shallow(
      <Form
        onSubmit={onSubmit}
        render={() => <SliderField marks={marks} name="metrics_resolutions_slider" />}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
