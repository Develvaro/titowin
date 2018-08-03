import React from "react";
import { Input } from "reactstrap";

const NumberInput = ({ input, value, name, id, placeholder, meta }) => (
  <Input
    type="number"
    {...input}
    value={value}
    name={name}
    id={id}
    placeholder={placeholder}
  />
);

export default NumberInput;
