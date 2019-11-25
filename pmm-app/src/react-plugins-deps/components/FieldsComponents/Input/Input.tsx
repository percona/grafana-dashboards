import React from 'react';
import { useField } from 'react-final-form-hooks';
import './Input.scss';
interface InputFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  form: any;
  style?: any;
  wrapperStyle?: any;
  text?: string;
  options?: any;
  defaultValue?: any;
}

export const InputField = ({ name, placeholder, required, form, style, wrapperStyle }: InputFieldInterface) => {
  // // @ts-ignore
  const { input, meta } = useField(name, form);
  return (
    <div className={'input-field-wrapper'} style={wrapperStyle || {}}>
      <input {...input} type="text" required={required} placeholder={placeholder} style={style || {}} className="input-field input-field--dark" />
      {meta.error && meta.touched && <span className={'error-message'}>{meta.error}</span>}
    </div>
  );
};
