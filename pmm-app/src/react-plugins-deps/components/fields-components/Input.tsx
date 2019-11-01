import React, { FunctionComponent } from 'react';
import { Field } from 'react-final-form';
import { useForm, useField } from 'react-final-form-hooks';

const InputComponent = ({ input, meta, placeholder = '', required, labelCol, wrapperCol, value, ...rest }) => {
  return <input type="text" onChange={input.onChange} placeholder={placeholder} value={value} className="input-field input-field--dark" />;
};

export const InputField = ({ name, placeholder, required, form, ...rest }) => {
  // @ts-ignore
  const field = useField(name, form);

  return <input type="text" {...field.input} placeholder={placeholder} className="input-field input-field--dark" />;
};
