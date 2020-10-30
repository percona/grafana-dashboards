import React, { FC, useCallback } from 'react';
import { SelectableValue } from '@grafana/data';
import { useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { RadioButton } from './RadioButton';
import { getStyles } from './RadioButtonGroup.styles';

export interface RadioButtonGroupProps {
  selected: string;
  name: string;
  options: SelectableValue[];
  value?: string;
  className?: string;
  dataQa?: string;
  onChange: (value: string) => void;
}

export const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
  selected,
  name,
  options,
  value,
  className,
  dataQa,
  onChange,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const isActive = useCallback((key: string) => (
    selected ? key === selected : key === value
  ), [selected, value]);

  return (
    <div className={cx(styles.radioButtonGroup, className)} data-qa={dataQa}>
      {options.map(({ key, value }) => (
        <RadioButton
          key={key}
          id={key}
          name={name}
          active={isActive(key)}
          onChange={(key) => onChange(key)}
        >
          {value}
        </RadioButton>
      ))}
    </div>
  );
};
