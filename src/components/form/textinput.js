import React from "react";
import { Input } from "reactstrap";

const TextInput = ({ options, input, value, name, id }) => (
  <Input type="text" {...input} value={value} name={name} id={id}>

  </Input>
);

export default TextInput;
