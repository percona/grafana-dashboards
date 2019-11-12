import React from 'react';
// import { useField } from 'react-final-form-hooks';
import { Select } from 'antd';
import './Select.scss';

interface SelectFieldInterface {
  required?: boolean;
  name?: string;
  'data-cy'?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  form?: any;
  style?: any;
  text?: string;
  options?: any;
  defaultValue?: any;
}
export const SelectField = ({ name, placeholder, required, form, options, defaultValue }: SelectFieldInterface) => {
  // @ts-ignore
  // const field = useField(name, form);
  //   {...field.input}
  return (
    <span className={'fields__select-field'}>
      <Select defaultValue={defaultValue} style={{ width: '40%' }}>
        {options.map(option => {
          // @ts-ignore
          return (
            <Option value={option.value}>
              <div class={'select-item'}>{option.label}</div>
            </Option>
          );
        })}
      </Select>
    </span>
  );
};
