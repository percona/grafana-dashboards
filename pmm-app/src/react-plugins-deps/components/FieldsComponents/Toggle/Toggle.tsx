import { Switch } from 'antd';
import React from 'react';
import { useField } from 'react-final-form-hooks';
import './Toggle.scss';
export const ToggleField = ({ name, form }) => {
  // @ts-ignore
  const { input } = useField(name, form);
  return <Switch onChange={input.onChange} checked={Boolean(input.value)} defaultChecked className={'toggle-field'} />;
};
