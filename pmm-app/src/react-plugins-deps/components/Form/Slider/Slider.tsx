import React from 'react';
import { useField } from 'react-final-form';
import { Slider } from 'antd';
import './Slider.scss';

interface SliderFieldInterface {
  name: string;
  style?: any;
  defaultValue?: any;
  marks?: any;
  tipFormatter: any;
}
export const SliderField = ({
  name,
  marks: marks,
  style,
  defaultValue,
  tipFormatter,
}: SliderFieldInterface) => {
  const { input } = useField(name);
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
