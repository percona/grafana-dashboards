import React, {FunctionComponent} from "react";
import { Field } from "react-final-form";

const CheckboxComponent = ({
  input,
  meta,
  required,
  labelCol,
  wrapperCol,
  ...rest
}) => {
  return (
    <input
      onChange={input.onChange}
      type="checkbox"
      className="input-field--dark"
    />
  );
};

interface CheckboxFieldInterface {
  required?: boolean;
  name: string;
  "data-cy": string;
}
export const CheckboxField = ({
  name,
  required,
  ...rest
}: CheckboxFieldInterface) => {
  return (
    <Field
      {...rest}
      name={name}
      component={CheckboxComponent as FunctionComponent}
      required={required}
    />
  );
};
