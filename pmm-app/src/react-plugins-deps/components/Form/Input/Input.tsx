import React from 'react';
import { useField } from 'react-final-form';
import './Input.scss';
import cx from 'classnames';
interface InputFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  style?: any;
  wrapperStyle?: any;
  text?: string;
  options?: any;
  defaultValue?: any;
  readonly?: boolean;
  validate?: any;
  className?: any;
}

export const InputField = ({
  name,
  placeholder = '',
  required,
  style,
  wrapperStyle,
  readonly,
  validate,
  className,
}: InputFieldInterface) => {
  // // @ts-ignore
  const { input, meta } = useField(name, { validate });
  return (
    <div className="input-field-wrapper" style={wrapperStyle || {}}>
      <input
        {...input}
        type="text"
        required={required}
        placeholder={`${required ? '*' : ''}${placeholder}`}
        style={style || {}}
        readOnly={readonly}
        className={cx('input-field input-field--dark', className)}
      />
      {meta.error && meta.touched && <span className="error-message">{meta.error}</span>}
    </div>
  );
};
