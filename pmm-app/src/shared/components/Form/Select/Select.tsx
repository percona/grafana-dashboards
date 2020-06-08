import React from 'react';
import { useField } from 'react-final-form';
import { Select } from 'antd';
import './Select.scss';
import { styles } from './Select.styles';

const { Option } = Select;
interface SelectFieldInterface {
  required?: boolean;
  name: string;
  dataQa?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  style?: any;
  text?: string;
  options?: any;
  defaultValue?: any;
}
export const SelectField = ({
  name, options, style, defaultValue, dataQa
}: SelectFieldInterface) => {
  const { input } = useField(name);
  return (
    <span className="fields__select-field" style={style || {}}>
      {/* eslint-disable-next-line max-len */}
      <Select {...input} defaultValue={defaultValue} className={styles.select} data-qa={dataQa}>
        {options
          && options.map((option) => (
            <Option value={option.value} key={option.label}>
              <div className="select-item">{option.label}</div>
            </Option>
          ))}
      </Select>
    </span>
  );
};
