import React from "react";
import { Input } from "reactstrap";

const TextInput = ({ input, value, name, id, placeholder, meta }) => (
  <Input
    type="text"
    {...input}
    value={value}
    name={name}
    id={id}
    placeholder={placeholder}
  />
);

export default TextInput;
