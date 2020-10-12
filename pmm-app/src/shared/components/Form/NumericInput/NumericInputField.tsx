import React, { FC } from 'react';
import { cx } from 'emotion';
import { useTheme } from '@grafana/ui';
import { NumericInput } from './NumericInput';
import { getStyles } from './NumericInputField.styles';

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
  meta,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  // TODO: remove error message from here once we have custom Field
  return (
    <div>
      <NumericInput
        {...input}
        className={cx(className, { [styles.invalid]: meta?.error })}
        disabled={disabled}
        data-qa={dataQa}
        label={label}
      />
      <div className={styles.errorMessage}>{meta?.error}</div>
    </div>
  );
};
