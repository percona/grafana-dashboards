import React from 'react';
// import { useField } from 'react-final-form-hooks';
interface InputFieldInterface {
  required?: boolean;
  name?: string;
  'data-cy'?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  form?: any;
  style?: any;
  text?: string;
  options?: any;
  defaultValue?: any;
}

export const InputField = ({ name, placeholder, required, form }: InputFieldInterface) => {
  // // @ts-ignore
  // const field = useField(name, form);
  // {...field.input}
  return <input type="text" placeholder={placeholder} className="input-field input-field--dark" />;
};
