import { Switch } from 'antd';
import React from 'react';
import { useField } from 'react-final-form-hooks';

export const ToggleField = ({ name, form }) => {
  // @ts-ignore
  const field = useField(name, form);
  return <Switch {...field.input} defaultChecked />;
};
