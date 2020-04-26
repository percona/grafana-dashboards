import React from 'react';
import './Checkbox.scss';
import { useField } from 'react-final-form';
import { Typography } from 'antd';
import { CheckboxFieldInterface } from './Checkbox.types';

const { Text } = Typography;
export const CheckboxField = ({ name, label, disabled }: CheckboxFieldInterface) => {
  const field = useField(name);

  return (
    <label className="checkbox-container checkbox-container--main">
      <input {...field.input} type="checkbox" disabled={disabled} />
      <span className="checkbox-container__checkmark"></span>
      <Text className="checkbox-container__label-text" ellipsis>
        {label}
      </Text>
    </label>
  );
};
