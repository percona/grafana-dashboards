import React, { FC } from 'react';
import { SelectableValue } from '@grafana/data';
import { RadioButton } from './RadioButton';
import { styles } from './RadioButtonGroup.styles';

export interface RadioButtonGroupProps {
  selected: string;
  name: string;
  options: SelectableValue[];
  dataQa?: string;
  onChange: (value: string) => void;
}

export const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
  selected,
  name,
  options,
  dataQa,
  onChange
}) => (
  <div className={styles.radioButtonGroup} data-qa={dataQa}>
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
