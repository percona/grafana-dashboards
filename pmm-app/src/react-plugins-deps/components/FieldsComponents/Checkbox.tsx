import React from 'react';
import { useField } from 'react-final-form-hooks';

interface CheckboxFieldInterface {
  required?: boolean;
  name: string;
  'data-cy': string;
  form: any;
}
export const CheckboxField = ({ name, required, form, ...rest }: CheckboxFieldInterface) => {
  const field = useField(name, form);

  return <input {...field.input} type="checkbox" className="input-field--dark" />;
};
