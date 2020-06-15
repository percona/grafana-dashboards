import { Switch } from 'antd';
import React from 'react';
import { useField } from 'react-final-form';
import './Toggle.scss';

interface ToggleInterface {
  name: string;
  disabled?: boolean;
}

export const ToggleField = ({ name, disabled }: ToggleInterface) => {
  const { input } = useField(name);

  return (
    <Switch
      onChange={input.onChange}
      checked={Boolean(input.value)}
      className="toggle-field"
      disabled={disabled}
    />
  );
};
