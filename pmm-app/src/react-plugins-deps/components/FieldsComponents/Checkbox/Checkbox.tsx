import React from 'react';
import { useField } from 'react-final-form-hooks';
import './Checkbox.scss';
// import { useField } from 'react-final-form';
interface CheckboxFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  form?: any;
  label?: string;
  checked?: boolean;
}
export const CheckboxField = ({ name, label, required, checked, form, ...rest }: CheckboxFieldInterface) => {
  const field = useField(name, form);

  return (
    <label className="checkbox-container checkbox-container--main">
      <input {...field.input} type="checkbox" checked={checked} />
      <span className="checkbox-container__checkmark"></span>
      <span className="checkbox-container__label-text">{label}</span>
    </label>
  );
};
