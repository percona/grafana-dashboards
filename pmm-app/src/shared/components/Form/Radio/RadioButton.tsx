import React, { FC, ReactNode } from 'react';
import { cx } from 'emotion';
import { useTheme } from '@grafana/ui';
import { getStyles } from './RadioButton.styles';

export interface RadioButtonProps {
  id: string;
  active: boolean;
  name?: string;
  children: ReactNode;
  onChange: (id: string) => void;
}

export const RadioButton: FC<RadioButtonProps> = ({
  id,
  active,
  name,
  children,
  onChange
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <>
      <input className={styles.radioButtonInput} type="radio" id={id} name={name} />
      <label
        className={cx(styles.radioButtonLabel, { [styles.radioButtonActive]: active })}
        htmlFor={id}
        onClick={() => onChange(id)}
      >
        {children}
      </label>
    </>
  );
};
