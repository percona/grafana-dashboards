import React from 'react';
import { useField } from 'react-final-form-hooks';
import './Checkbox.scss';
import { Typography } from 'antd';

const { Text } = Typography;
interface CheckboxFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  form: any;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
}

export const CheckboxField = ({
  name,
  label,
  required,
  form,
  disabled = false,
  ...rest
}: CheckboxFieldInterface) => {
  const field = useField(name, form);

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
