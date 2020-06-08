import React from 'react';
import { useField } from 'react-final-form';
import { cx } from 'emotion';
import './TextArea.scss';

interface TextAreaFieldInterface {
  required?: boolean;
  name: string;
  dataQa?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  style?: any;
  className?: any;
}
export const TextAreaField = ({
  name, placeholder, style, className, dataQa
}: TextAreaFieldInterface) => {
  const { input, meta } = useField(name);
  return (
    <div className="text-area-field-wrapper">
      <textarea
        {...input}
        rows={5}
        className={cx('input-field input-field--textarea input-field--dark', className)}
        style={style}
        placeholder={placeholder}
        data-qa={dataQa}
      />
      {meta.error && meta.touched && <span className="error-message">{meta.error}</span>}
    </div>
  );
};
