import React, { FunctionComponent } from 'react';
import { useForm, useField } from 'react-final-form-hooks';

export const InputField = ({ name, placeholder, required, form, ...rest }) => {
  // @ts-ignore
  const field = useField(name, form);

  return <input type="text" {...field.input} placeholder={placeholder} className="input-field input-field--dark" />;
};
