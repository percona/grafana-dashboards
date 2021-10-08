import React from 'react';
import { useField } from 'react-final-form';
import { useTheme } from '@grafana/ui';
import { OverflowTooltip } from '../../Elements/OverflowTooltip/OverflowTooptip';
import { getCheckboxStyles } from './Checkbox.styles';

interface CheckboxFieldInterface {
  required?: boolean;
  name: string;
  dataTestId?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
}

export const CheckboxField = ({
  name, label, required, disabled, dataTestId,
}: CheckboxFieldInterface) => {
  const field = useField(name, { type: 'checkbox' });
  const theme = useTheme();
  const styles = getCheckboxStyles(theme);

  return (
    <label className={styles.checkboxContainer}>
      <input
        {...field.input}
        type="checkbox"
        required={required}
        disabled={disabled}
        data-testid={dataTestId}
      />
      <span className="checkbox-container__checkmark" />
      <OverflowTooltip className="checkbox-container__label-text">
        {label}
      </OverflowTooltip>
    </label>
  );
};
