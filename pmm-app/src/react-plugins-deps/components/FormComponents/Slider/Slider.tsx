import React from 'react';
import { useField } from 'react-final-form';
import { Slider } from 'antd';
import { SliderMarks } from 'antd/lib/slider';
import './Slider.scss';

interface SliderFieldInterface {
  name: string;
  style?: any;
  marks?: SliderMarks;
  tipFormatter?: (value: number) => string;
}
export const SliderField = ({ name, marks, style, tipFormatter }: SliderFieldInterface) => {
  const { input } = useField(name);
  return (
    <span className="fields__Slider-field" style={style || {}}>
      <Slider {...input} marks={marks} max={2} step={null} included={false} tipFormatter={tipFormatter} />
    </span>
  );
};
