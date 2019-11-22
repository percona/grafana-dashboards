import React from 'react';
import { useField } from 'react-final-form-hooks';
interface InputFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  form: any;
  style?: any;
  text?: string;
  options?: any;
  defaultValue?: any;
}

export const InputField = ({ name, placeholder, required, form, style }: InputFieldInterface) => {
  // // @ts-ignore
  const field = useField(name, form);
  return (
    <input {...field.input} type="text" required={required} placeholder={placeholder} style={style || {}} className="input-field input-field--dark" />
  );
};
