import React from "react";
import { Input, FormFeedback } from "reactstrap";

const TextInput = ({
  input: { value, ...rest },
  name,
  id,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <Input
      valid={touched && !error}
      invalid={touched && error}
      type="text"
      {...rest}
      value={value}
      name={name}
      id={id}
      placeholder={placeholder}
    />

    {touched &&
      ((error && <FormFeedback>{error}</FormFeedback>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

export default TextInput;
