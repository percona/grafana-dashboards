import React from 'react';
import { useField } from 'react-final-form';
import './TextArea.scss';
interface TextAreaFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  style?: any;
}
export const TextAreaField = ({ name, placeholder, style }: TextAreaFieldInterface) => {
  const { input, meta } = useField(name);
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
