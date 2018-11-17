import React from "react";
import { Input, FormFeedback } from "reactstrap";

const DatePicker = ({
  name,
  id,
  input: { value, ...rest },
  meta: { touched, error, warning }
}) => (
  <div>
    <Input
      valid={touched && !error}
      invalid={touched && error}
      type="date"
      name={name}
      id={id}
      {...rest}
      value={value}
    />
    {touched &&
      ((error && <FormFeedback>{error}</FormFeedback>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

export default DatePicker;
