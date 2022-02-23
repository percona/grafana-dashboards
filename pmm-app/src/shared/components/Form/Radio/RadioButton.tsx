import React, { FC, ReactNode } from 'react';
import { cx } from '@emotion/css';
import { useTheme } from '@grafana/ui';
import { getStyles } from './RadioButton.styles';

export interface RadioButtonProps {
  id: string;
  active: boolean;
  name?: string;
  children: ReactNode;
  disabled?: boolean;
  onChange: (id: string) => void;
}

export const RadioButton: FC<RadioButtonProps> = ({
  id,
  active,
  name,
  children,
  disabled = false,
  onChange,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const radioButtonStyles = {
    [styles.radioButtonActive]: active,
    [styles.radioButtonDisabled]: disabled,
  };

  return (
    <>
      <input className={styles.radioButtonInput} type="radio" id={id} name={name} />
      <label
        className={cx(styles.radioButtonLabel, radioButtonStyles)}
        htmlFor={id}
        onClick={() => onChange(id)}
      >
        {children}
      </label>
    </>
  );
};
