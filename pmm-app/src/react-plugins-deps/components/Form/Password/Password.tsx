import React from 'react';
import { useField } from 'react-final-form';

export const PasswordField = ({ name, placeholder = '', required = false }) => {
  const { input } = useField(name);

  return (
    <input
      type="password"
      {...input}
      required={required}
      placeholder={`${required ? '*' : ''}${placeholder}`}
      className="input-field input-field--dark"
    />
  );
};
