import React, {FunctionComponent} from "react";
import { Field } from "react-final-form";

const InputComponent = ({
  input,
  meta,
  placeholder = "",
  required,
  labelCol,
  wrapperCol,
  ...rest
}) => {
  return (
    <input
      type="text"
      onChange={input.onChange}
      placeholder={placeholder}
      className="input-field input-field--dark"
    />
  );
};

export const InputField = ({
  name,
  placeholder,
  required,
  ...rest
}) => {
  // @ts-ignore
  return (
    <Field
      {...rest}
      name={name}
      component={InputComponent as FunctionComponent}
      placeholder={placeholder}
      required={required}
    />
  );
};
