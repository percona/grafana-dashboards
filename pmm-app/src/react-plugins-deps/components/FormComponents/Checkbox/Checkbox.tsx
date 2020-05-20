import React from 'react';
import { useField } from 'react-final-form';
import './Checkbox.scss';

interface CheckboxFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  label?: string;
  checked?: boolean;
}

export const CheckboxField = ({ name, label, required }: CheckboxFieldInterface) => {
  const field = useField(name);

  return (
    <label className="checkbox-container checkbox-container--main">
      <input {...field.input} type="checkbox" checked={field.input.value} required={required} />
      <span className="checkbox-container__checkmark"></span>
      <span className="checkbox-container__label-text">{label}</span>
    </label>
  );
};
