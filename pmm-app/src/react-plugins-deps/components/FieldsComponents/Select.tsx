import React from 'react';
import { useField } from 'react-final-form-hooks';
import { Select } from 'antd';
import './Select.scss';
export const SelectField = ({ name, placeholder, required, form, options, defaultValue, ...rest }) => {
  // @ts-ignore
  // const field = useField(name, form);
  //   {...field.input}
  return (
    <span className={'fields__select-field'}>
      <Select defaultValue={defaultValue} style={{ width: '40%' }}>
        {options.map(option => {
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
