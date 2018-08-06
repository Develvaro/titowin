import React from "react";
import { Input } from "reactstrap";

const NumberInput = ({ input, value, name, id, placeholder, meta: {touched, error, warning} }) => (
  <div>
  <Input valid = {touched && !error} invalid = {touched && error}
    type="number"
    {...input}
    value={value}
    name={name}
    id={id}
    placeholder={placeholder}
  />

  {touched &&
    ((error && <span>{error}</span>) ||
      (warning && <span>{warning}</span>))}
  </div>
);

export default NumberInput;
