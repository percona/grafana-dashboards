import React from 'react';
import { useField } from 'react-final-form';
import { Select } from 'antd';
import './Select.scss';

const { Option } = Select;
interface SelectFieldInterface {
  required?: boolean;
  name: string;
  'data-cy'?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  style?: any;
  text?: string;
  options?: any;
  defaultValue?: any;
}
export const SelectField = ({
  name,
  placeholder,
  required,
  options,
  style,
  defaultValue,
}: SelectFieldInterface) => {
  const { input } = useField(name);
  return (
    <span className="fields__select-field" style={style || {}}>
      <Select {...input} defaultValue={defaultValue} style={{ width: '100%', height: '40px' }}>
        {options &&
          options.map(option => {
            // @ts-ignore
            return (
              <Option value={option.value} key={option.label}>
                <div className="select-item">{option.label}</div>
              </Option>
            );
          })}
      </Select>
    </span>
  );
};
