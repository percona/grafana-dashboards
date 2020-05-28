import React from 'react';
import { Slider } from 'antd';
import { Form } from 'react-final-form';
import { mount } from 'enzyme';
import { SliderField } from './Slider';

describe('Slider', () => {
  it('Slider renders without props', () => {
    const marks = {
      0: 'Low',
      1: 'Medium',
      2: 'High',
    };

    const onSubmit = jest.fn();
    const root = mount(
      <Form
        onSubmit={onSubmit}
        initialValues={{ metrics_resolutions_slider: 0 }}
        render={() => (
          <SliderField marks={marks} name="metrics_resolutions_slider" tipFormatter={jest.fn()} />
        )}
      />,
    );

    expect(root.find(Slider).prop('name')).toEqual('metrics_resolutions_slider');
    expect(root.find(Slider).prop('marks')).toEqual(marks);
    expect(root).toMatchSnapshot();

    root.unmount();
  });
});
