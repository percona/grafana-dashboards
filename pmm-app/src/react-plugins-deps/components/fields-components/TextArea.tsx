import React from 'react';
import { useField } from 'react-final-form-hooks';

interface TextAreaFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  form: any;
}
export const TextAreaField = ({ name, prefix, placeholder, label, required, form }: TextAreaFieldInterface) => {
  const field = useField(name, form);

  return <textarea {...field.input} rows={5} className="input-field input-field--textarea input-field--dark" placeholder={placeholder}></textarea>;
};
