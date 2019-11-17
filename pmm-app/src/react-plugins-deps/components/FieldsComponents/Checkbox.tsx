import React from 'react';
// import { useField } from 'react-final-form-hooks';
import './Checkbox.scss';
interface CheckboxFieldInterface {
  required?: boolean;
  name?: string;
  'data-cy'?: string;
  form?: any;
  label?: string;
}
export const CheckboxField = ({ name, label, required, form, ...rest }: CheckboxFieldInterface) => {
  // const field = useField(name, form);

  return (
    <label className="checkbox-container checkbox-container--main">
      <input type="checkbox" />
      <span className="checkbox-container__checkmark"></span>
      <span className="checkbox-container__label-text">{label}</span>
    </label>
  );
};
