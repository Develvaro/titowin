import React from "react";
import { Input, FormFeedback } from "reactstrap";

const DatePicker = ({ name, id, input, meta: {touched, error, warning}}) => (
  <div>
  <Input valid = {touched && !error} invalid = {touched && error}
  type="date" name={name} id={id} {...input} />
  {touched &&
    ((error && <FormFeedback>{error}</FormFeedback>) ||
      (warning && <span>{warning}</span>))}
  </div>

);

export default DatePicker;
