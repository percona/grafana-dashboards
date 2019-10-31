import React, {FunctionComponent} from "react";
import { Field } from "react-final-form";

const TextAreaComponent = ({
  input,
  meta,
  placeholder = "",
  prefix,
  label,
  required,
  labelCol,
  wrapperCol,
  ...rest
}) => {
  return (
    <textarea
      onChange={input.onChange}
      rows={5}
      className="input-field input-field--textarea input-field--dark"
      placeholder={placeholder}
    ></textarea>
  );
};

interface TextAreaFieldInterface {
  required?: boolean;
  name: string;
  "data-cy"?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
}
export const TextAreaField = ({
  name,
  prefix,
  placeholder,
  label,
  required,
  ...rest
}: TextAreaFieldInterface) => {
  return (
    <Field
      {...rest}
      prefix={prefix}
      name={name}
      component={TextAreaComponent as FunctionComponent}
      placeholder={placeholder}
      label={label}
      required={required}
    />
  );
};
