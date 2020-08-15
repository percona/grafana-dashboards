import React, { FC } from 'react';
import { Field } from '@grafana/ui';
import { NumericInput } from './NumericInput';
import { styles } from './NumericInputField.styles';

interface NumericInputFieldProps {
  className?: string;
  dataQa?: string;
  disabled?: boolean;
  label?: string;
  input?: any;
  meta?: any;
}

export const NumericInputField: FC<NumericInputFieldProps> = ({
  label,
  className,
  disabled,
  dataQa,
  input,
  meta
}) => (
  <Field
    invalid={meta?.error}
    error={meta?.error}
    disabled={disabled}
    className={styles.fieldWrapper}
  >
    <NumericInput
      {...input}
      className={className}
      disabled={disabled}
      data-qa={dataQa}
      label={label}
    />
  </Field>
);
