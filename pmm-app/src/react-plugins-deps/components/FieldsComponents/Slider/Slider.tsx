import React from 'react';
import { useField } from 'react-final-form-hooks';
import { Slider } from 'antd';
import './Slider.scss';

const { Option } = Slider;
interface SliderFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  form?: any;
  style?: any;
  text?: string;
  options?: any;
  defaultValue?: any;
  marks?: any;
}
export const SliderField = ({ name, marks: marks, form, style, defaultValue }: SliderFieldInterface) => {
  const { input } = useField(name, form);
  return (
    <span className={'fields__Slider-field'} style={style || {}}>
      <Slider {...input} marks={marks} max={2} step={null} included={false} defaultValue={defaultValue} />
    </span>
  );
};
