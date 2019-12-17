import React from 'react';
import { useField } from 'react-final-form-hooks';
import './Checkbox.scss';
import { Typography } from 'antd';

const { Text } = Typography;
// import { useField } from 'react-final-form';
interface CheckboxFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  form: any;
  label?: string;
  checked?: boolean;
}
export const CheckboxField = ({ name, label, required, form, ...rest }: CheckboxFieldInterface) => {
  const field = useField(name, form);

  return (
    <label className="checkbox-container checkbox-container--main">
      <input {...field.input} type="checkbox" checked={field.input.value} />
      <span className="checkbox-container__checkmark"></span>
      <Text className="checkbox-container__label-text" ellipsis={true}>
        {label}
      </Text>
    </label>
  );
};
