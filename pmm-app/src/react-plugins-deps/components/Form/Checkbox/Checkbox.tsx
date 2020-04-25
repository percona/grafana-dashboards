import React from 'react';
import './Checkbox.scss';
import { useField } from 'react-final-form';
import { Typography } from 'antd';

const { Text } = Typography;
interface CheckboxFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
}
export const CheckboxField = ({ name, label, required }: CheckboxFieldInterface) => {
  const field = useField(name);

  return (
    <label className="checkbox-container checkbox-container--main">
      <input
        {...field.input}
        type="checkbox"
        checked={rest.checked || field.input.value}
        disabled={disabled}
      />
      <span className="checkbox-container__checkmark"></span>
      <Text className="checkbox-container__label-text" ellipsis={true}>
        {label}
      </Text>
    </label>
  );
};
