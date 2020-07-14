import React from 'react';
import { useField } from 'react-final-form';
import { OverflowTooltip } from '../../Elements/OverflowTooltip/OverflowTooptip';
import './Checkbox.scss';

interface CheckboxFieldInterface {
  required?: boolean;
  name: string;
  dataQa?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
}

export const CheckboxField = ({
  name, label, required, disabled, dataQa
}: CheckboxFieldInterface) => {
  const field = useField(name, { type: 'checkbox' });

  return (
    <label className="checkbox-container checkbox-container--main">
      <input
        {...field.input}
        type="checkbox"
        required={required}
        disabled={disabled}
        data-qa={dataQa}
      />
      <span className="checkbox-container__checkmark" />
      <OverflowTooltip className="checkbox-container__label-text">
        {label}
      </OverflowTooltip>
    </label>
  );
};
