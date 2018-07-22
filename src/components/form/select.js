import React from "react";
import { Input } from "reactstrap";

const Select = ({ options, input, value, name, id }) => (
  <Input type="select" {...input} value={value} name={name} id={id}>
    {
      options ? options.map(option => <option value={option.value}>{option.name}</option>)
      : null
    }
  </Input>
);

export default Select;
