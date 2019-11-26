import React from 'react';
import { useField } from 'react-final-form-hooks';
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
  form?: any;
  style?: any;
  text?: string;
  options?: any;
  defaultValue?: any;
}
export const SelectField = ({ name, placeholder, required, form, options, style, defaultValue }: SelectFieldInterface) => {
  const { input } = useField(name, form);

  return (
    <span className={'fields__select-field'} style={style || {}}>
      <Select defaultValue={defaultValue} style={{ width: '100%' }}>
        {options &&
          options.map(option => {
            // @ts-ignore
            return (
              <Option value={option.value}>
                <div className={'select-item'}>{option.label}</div>
              </Option>
            );
          })}
      </Select>
    </span>
  );
};
//
// import React from 'react';
// import { useField } from 'react-final-form-hooks';
//
// export const SelectField = ({ name, placeholder, required, form, ...rest }) => {
//   // @ts-ignore
//   const field = useField(name, form);
//
//   return <input type={'password'} {...field.input} placeholder={placeholder} className="input-field input-field--dark" />;
// };
