import React, { FC } from 'react';
import { SelectableValue } from '@grafana/data';
import { useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { RadioButton } from './RadioButton';
import { getStyles } from './RadioButtonGroup.styles';

export interface RadioButtonGroupProps {
  selected: string;
  name: string;
  options: SelectableValue[];
  className?: string;
  dataQa?: string;
  onChange: (value: string) => void;
}

export const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
  selected,
  name,
  options,
  className,
  dataQa,
  onChange
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={cx(styles.radioButtonGroup, className)} data-qa={dataQa}>
      {options.map(({ key, value }) => (
        <RadioButton
          key={key}
          id={key}
          name={name}
          active={key === selected}
          onChange={(key) => onChange(key)}
        >
          {value}
        </RadioButton>
      ))}
    </div>
  );
};
