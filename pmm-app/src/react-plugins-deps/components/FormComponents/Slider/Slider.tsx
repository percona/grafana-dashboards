import React from 'react';
import { useField } from 'react-final-form-hooks';
import { Slider } from 'antd';
import './Slider.scss';

interface SliderFieldInterface {
  name: string;
  form?: any;
  style?: any;
  defaultValue?: any;
  marks?: any;
  tipFormatter: any;
}
export const SliderField = ({
  name,
  marks: marks,
  form,
  style,
  defaultValue,
  tipFormatter,
}: SliderFieldInterface) => {
  const { input } = useField(name, form);
  return (
    <span className="fields__Slider-field" style={style || {}}>
      <Slider
        {...input}
        marks={marks}
        max={2}
        step={null}
        included={false}
        defaultValue={defaultValue}
        tipFormatter={tipFormatter}
      />
    </span>
  );
};
