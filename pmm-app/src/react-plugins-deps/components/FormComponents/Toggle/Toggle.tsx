import { Switch } from 'antd';
import React from 'react';
import { useField } from 'react-final-form-hooks';
import './Toggle.scss';

interface ToggleInterface {
  name: string;
  form: any;
  disabled?: boolean;
}
export const ToggleField = ({ name, form, disabled }: ToggleInterface) => {
  // @ts-ignore
  const { input } = useField(name, form);
  return <Switch onChange={input.onChange} checked={Boolean(input.value)} defaultChecked className={'toggle-field'} disabled={disabled} />;
};
