import React from 'react';
// import { useField } from 'react-final-form';
import { useField } from 'react-final-form-hooks';
import './TextArea.scss';
interface TextAreaFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  form?: any;
  style?: any;
}
export const TextAreaField = ({ name, prefix, placeholder, label, required, form, style }: TextAreaFieldInterface) => {
  const { input, meta } = useField(name, form);
  return (
    <div className="text-area-field-wrapper">
      <textarea
        {...input}
        rows={5}
        className="input-field input-field--textarea input-field--dark"
        style={style}
        placeholder={placeholder}
      />
      {meta.error && meta.touched && <span className="error-message">{meta.error}</span>}
    </div>
  );
};
